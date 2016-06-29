using Microsoft.Band;
using Microsoft.Band.Portable;
using Microsoft.Band.Portable.Tiles;
using Microsoft.Band.Portable.Tiles.Pages;
using Microsoft.Band.Portable.Tiles.Pages.Data;
using Newtonsoft.Json;
using PowerfulTrainer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Xamarin.Forms;
namespace PowerfulTrainer
{
    public partial class MainPage : ContentPage
    {
        public MainPage()
        {
            NavigationPage.SetHasNavigationBar(this, false);

            InitializeComponent();
            Browser.OnJsNotify += Browser_OnJsNotify;
            AppManagement.Init();
        }

        protected override async void OnAppearing()
        {
            base.OnAppearing();
            await BandManagement.Init();
            BandClient = BandManagement.BandClient;
            await CreateBandTitle();
            SetTileBeginData();
            BandClient.TileManager.TileButtonPressed += TileManager_TileButtonPressed;
            Device.StartTimer(TimeSpan.FromSeconds(1), Timer_Tick);
        }

        private void Browser_OnJsNotify(WebBrowser Sender, string Data)
        {
            var Key = Data.Substring(0, Data.IndexOf(':')).ToLower();
            var Value = Data.Substring(Data.IndexOf(':') + 1);
            if (Key == "token")
            {
                AppManagement.AccessToken = Value;
            }
            if (Key == "plan")
            {
                try
                {
                    var PlanData = JsonConvert.DeserializeObject<PlanData>(Value);
                    WorkoutManagement.PlanData = PlanData;
                    StartWorkout();
                    DependencyService.Get<IFileManagement>().SaveText("data", JsonConvert.SerializeObject(PlanData));
                }
                catch
                {
                    DisplayAlert("Something went wrong", "Please try again.", "OK");
                }
            }
        }   

        Guid pageGuid = new Guid(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12);
        BandClient BandClient = null;
        private async Task CreateBandTitle()
        {
            var Tiles = await BandClient.TileManager.GetTilesAsync();
            if (Tiles.Count(u => u.Id == BandManagement.tileGuid) > 0)
            {
                return;
                //await BandClient.TileManager.RemoveTileAsync(BandManagement.tileGuid);
            }
            var Theme = await BandClient.PersonalizationManager.GetThemeAsync();

            var IconStream = typeof(MainPage).GetTypeInfo().Assembly.GetManifestResourceStream("PowerfulTrainer.Images.BandIcon.png");
            var SmallIconStream = typeof(MainPage).GetTypeInfo().Assembly.GetManifestResourceStream("PowerfulTrainer.Images.BandSmallIcon.png");
            var Icon = await BandImage.FromStreamAsync(IconStream);
            var SmallIcon = await BandImage.FromStreamAsync(SmallIconStream);
            BandTile tile = new BandTile(BandManagement.tileGuid)
            {
                Name = "Powerful Trainer",
                Icon = Icon,
                SmallIcon = SmallIcon,
                IsScreenTimeoutDisabled = true
            };
            FilledPanel panel = new FilledPanel
            {
                Rect = new PageRect(0, 0, 270, 120),
            };
            panel.Elements.Add(new TextButton
            {
                ElementId = 1,
                Rect = new PageRect(188, 70, 80, 50),
            });

            panel.Elements.Add(new WrappedTextBlock
            {
                ElementId = 2,
                Rect = new PageRect(5, 2, 270, 50),
                AutoHeight = true,
                Color = Theme.Highlight
            });

            panel.Elements.Add(new TextBlock
            {
                ElementId = 3,
                Rect = new PageRect(2, 90, 270, 50),
                AutoWidth = true
            });


            PageLayout layout = new PageLayout(panel);
            tile.PageLayouts.Add(layout);

            try
            {
                await BandClient.TileManager.AddTileAsync(tile);
            }
            catch { }
        }

        object LockObj = new object();
        bool CanSetTileData = true;
        private async void SetTileBeginData()
        {
            PageData pageContent = new PageData()
            {
                PageId = pageGuid,
                PageLayoutIndex = 0,
            };
            var pageContentData = pageContent.Data;

            pageContentData.Add(new WrappedTextBlockData()
            {
                ElementId = 2,
                Text = "Have a nice day"
            });
            pageContentData.Add(new TextButtonData()
            {
                ElementId = 1,
                Text = "^^!"
            });

            await BandClient.TileManager.SetTilePageDataAsync(BandManagement.tileGuid, pageContent);
        }

        private async void SetTileData()
        {
            Monitor.Enter(LockObj);
            CanSetTileData = false;
            PageData pageContent = new PageData()
            {
                PageId = pageGuid,
                PageLayoutIndex = 0,
            };
            var pageContentData = pageContent.Data;
            if (ExIndex < WorkoutManagement.PlanData.Data.Count)
            {
                pageContentData.Add(new TextButtonData()
                {
                    ElementId = 1,
                    Text = "Next"
                });
                var PlanItem = WorkoutManagement.PlanData.Data[ExIndex];
                pageContentData.Add(new WrappedTextBlockData()
                {
                    ElementId = 2,
                    Text = PlanItem.Name + " " + PlanItem.SubInfo,
                });
                var BandTime = ExTimeSpan.Add(TimeSpan.FromSeconds(2));
                pageContentData.Add(new TextBlockData()
                {
                    ElementId = 3,
                    Text = BandTime.Minutes.ToString("00") + ":" + BandTime.Seconds.ToString("00")
                });
            }
            await BandClient.TileManager.SetTilePageDataAsync(BandManagement.tileGuid, pageContent);
            CanSetTileData = true;
            Monitor.Exit(LockObj);
        }

        private void TileManager_TileButtonPressed(object sender, BandTileButtonPressedEventArgs e)
        {
            if(RunTimer)
            Device.BeginInvokeOnMainThread(() =>
            {
                SetWorkout();
            });
        }

        void NextBtn_Click(object sender, object args)
        {
            SetWorkout();
        }

        int ExIndex = -1;
        TimeSpan TotalTimeSpan = new TimeSpan();
        TimeSpan ExTimeSpan = new TimeSpan();
        DateTime BeginTime = new DateTime();
        private async void StartWorkout()
        {
            ExIndex = -1;
            NextBtn.Text = "Next";     
            Workout.IsVisible = true;
            TotalTimeSpan = new TimeSpan();
            BeginTime = DateTime.Now;
            SetWorkout();
            await BandManagement.Start();
            RunTimer = true;
            AppManagement.IsEventRuning = true;
        }

        private async void StopWorkout()
        {
            RunTimer = false;
            ExVideo.Stop();
            AppManagement.IsEventRuning = false;
            SetTileBeginData();
            BandManagement.Stop();
            await HttpClient.Post<string>("http://aloraha.com/api/report", new AddReportReq()
            {
                PlanID = WorkoutManagement.PlanData.Id,
                AvgHeartRate = (float)BandManagement.GetValue(BandSensorType.HeartRate),
                TotalCals = (float)BandManagement.GetValue(BandSensorType.Calories),
                TotalSteps = (float)BandManagement.GetValue(BandSensorType.Step),
                BeginTime = BeginTime,
                Duration = (int)TotalTimeSpan.TotalSeconds
            });
            Workout.IsVisible = false;
            Browser.Uri = "http://aloraha.com/report/workout//?inapp";
        }

        bool RunTimer = false;
        private bool Timer_Tick()
        {
            if (RunTimer)
            {
                try
                {
                    if (CanSetTileData)
                    {
                        SetTileData();
                    }
                }
                catch { }
                TotalTimeSpan = TotalTimeSpan.Add(TimeSpan.FromSeconds(1));
                TotalTime.Text = TotalTimeSpan.Hours.ToString("00") + ":" + TotalTimeSpan.Minutes.ToString("00") + ":" + TotalTimeSpan.Seconds.ToString("00");

                ExTimeSpan = ExTimeSpan.Add(TimeSpan.FromSeconds(1));
                ExTime.Text = ExTimeSpan.Minutes.ToString("00") + ":" + ExTimeSpan.Seconds.ToString("00");

                CalValue.Text = (BandManagement.GetValue(BandSensorType.Calories)).ToString("0");
                CalChart(CalBar, WorkoutManagement.PlanData.TotalCals, BandManagement.GetValue(BandSensorType.Calories));

                StepValue.Text = (BandManagement.GetValue(BandSensorType.Step)).ToString("0");
                CalChart(StepBar, WorkoutManagement.PlanData.TotalSteps, BandManagement.GetValue(BandSensorType.Step));

                HeartValue.Text = (BandManagement.GetValue(BandSensorType.HeartRate)).ToString("0");
                CalChart(HeartBar, WorkoutManagement.PlanData.AvgHeartRate, BandManagement.GetValue(BandSensorType.HeartRate));

                DistanceValue.Text = (BandManagement.GetValue(BandSensorType.Step)*0.5).ToString("0");
                CalChart(DistanceBar, WorkoutManagement.PlanData.TotalSteps * 0.5, BandManagement.GetValue(BandSensorType.Step)*0.5);
            }
            return true;
        }

        private void SetWorkout()
        {
            ExIndex++;
            ExTimeSpan = new TimeSpan();
            ExVideo.Stop();
            if (ExIndex < WorkoutManagement.PlanData.Data.Count)
            {
                var PlanItem = WorkoutManagement.PlanData.Data[ExIndex];
                Title.Text = PlanItem.Name;
                SubInfo.Text = PlanItem.SubInfo;
                if (!String.IsNullOrEmpty(PlanItem.VideoId))
                {
                    ExImage.IsVisible = false;
                    ExVideo.IsVisible = true;
                    ExVideo.Source = @"https://az803746.vo.msecnd.net/tenant/amp/entityid/" + PlanItem.VideoId + "?blobrefkey=103&$blob=1";
                }
                else
                {
                    if (string.IsNullOrEmpty(PlanItem.Thumbnail))
                    {
                        PlanItem.Thumbnail = "http://rugbydudefitness.com/wp-content/uploads/2013/09/Rest-and-Repair.jpg";
                    }
                    ExImage.Source = ImageSource.FromUri(new Uri(PlanItem.Thumbnail));
                    ExImage.IsVisible = true;
                    ExVideo.IsVisible = false;
                }
            }
            else
            {
                StopWorkout();
            }
            if (ExIndex == WorkoutManagement.PlanData.Data.Count - 1)
            {
                NextBtn.Text = "Done";
            }
        }

        private void CalChart(Grid Bar, double? MaxValue, double Value)
        {
            try
            {
                Bar.Children.Clear();
                var Height = MaxValue.HasValue ? Chart.Height * Value / MaxValue.Value : Chart.Height;
                if (Height > Chart.Height)
                {
                    Height = Chart.Height;
                }
                Bar.Children.Add(new Grid()
                {
                    VerticalOptions = LayoutOptions.End,
                    HorizontalOptions = LayoutOptions.Fill,
                    BackgroundColor = (Bar.Parent as Grid).BackgroundColor,
                    HeightRequest = Height
                });
            }
            catch (Exception ex)
            { }
        }
    }
}