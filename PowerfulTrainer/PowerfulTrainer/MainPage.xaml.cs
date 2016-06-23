using Microsoft.Band;
using Microsoft.Band.Portable;
using Microsoft.Band.Portable.Tiles;
using Microsoft.Band.Portable.Tiles.Pages;
using Microsoft.Band.Portable.Tiles.Pages.Data;
using Newtonsoft.Json;
using PowerfulTrainer.Models;
using PowerfulTrainer.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Windows.UI.Xaml;
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
            Timer.Interval = TimeSpan.FromSeconds(1);
            Timer.Tick += Timer_Tick;
        }

        protected override async void OnAppearing()
        {
            base.OnAppearing();
            await ConnectBand();
            await CreateBandTitle();
        }

        PlanData PlanData;

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
                    PlanData = JsonConvert.DeserializeObject<PlanData>(Value);
                    PlanData.AvgHeartRate = 90;
                    PlanData.TotalSteps = 200;
                    PlanData.TotalCals = 10;
                    PlanData = OptimizePlanData(PlanData);
                    StartWorkout();
                    DependencyService.Get<IFileManagement>().SaveText("data", JsonConvert.SerializeObject(PlanData));
                }
                catch
                {
                    DisplayAlert("Something went wrong", "Please try again.", "OK");
                }
            }
        }

        private PlanData OptimizePlanData(PlanData PlanData)
        {
            PlanData TmpData = new PlanData();
            TmpData.AvgHeartRate = PlanData.AvgHeartRate;
            TmpData.TotalCals = PlanData.TotalCals;
            TmpData.TotalSteps = PlanData.TotalSteps;
            TmpData.Id = PlanData.Id;
            foreach (var Exercise in PlanData.Data)
            {
                if (Exercise.Name.Contains("Rest"))
                {
                    Exercise.Thumbnail = "http://rugbydudefitness.com/wp-content/uploads/2013/09/Rest-and-Repair.jpg";
                }
                for (int i = 0; i < Exercise.Sets; i++)
                {
                    string ExtraInfo = "";
                    if (!String.IsNullOrEmpty(Exercise.Duration))
                    {
                        TimeSpan timediff = new TimeSpan(0, 0, int.Parse(Exercise.Duration));
                        ExtraInfo += timediff.Minutes.ToString("00") + ":" + timediff.Seconds.ToString("00");
                    }
                    else
                    {
                        if (Exercise.Repetitions != null && Exercise.Repetitions > 0)
                        {
                            ExtraInfo += Exercise.Repetitions + " rep";
                        }
                        else
                        {
                            ExtraInfo += "Max rep";
                        }
                    }

                    TmpData.Data.Add(new PlanItem()
                    {
                        Duration = Exercise.Duration,
                        Repetitions = Exercise.Repetitions,
                        SubInfo = ExtraInfo,
                        VideoId = Exercise.VideoId,
                        Thumbnail = Exercise.Thumbnail,
                        Name = Exercise.Name + (Exercise.Sets > 1 ? (" (" + (i + 1) + "/" + Exercise.Sets + ")") : "")
                    });
                    if (i < Exercise.Sets - 1)
                    {
                        if (!string.IsNullOrEmpty(Exercise.RestTime))
                        {
                            int tmp;
                            string RestName = "";
                            if (int.TryParse(Exercise.RestTime, out tmp))
                            {
                                TimeSpan timediff = new TimeSpan(0, 0, tmp);
                                RestName = "" + timediff.Minutes.ToString("00") + ":" + timediff.Seconds.ToString("00");
                            }
                            else
                            {
                                RestName = "" + Exercise.RestTime;
                            }
                            TmpData.Data.Add(new PlanItem()
                            {
                                Duration = Exercise.RestTime,
                                Name = "Rest",
                                SubInfo = RestName,
                                IsRestItem = true,
                                Thumbnail = "http://rugbydudefitness.com/wp-content/uploads/2013/09/Rest-and-Repair.jpg"
                            });
                        }
                    }
                }
            }
            return TmpData;
        }

        Guid tileGuid = new Guid(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
        Guid pageGuid = new Guid(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12);
        BandClient BandClient = null;
        private async Task CreateBandTitle()
        {
            //await BandClient.TileManager.RemoveTileAsync(tileGuid);
            var Tiles = await BandClient.TileManager.GetTilesAsync();
            if(Tiles.Count(u=>u.Id == tileGuid)>0)
            {
                return;
            }
            var Theme = await BandClient.PersonalizationManager.GetThemeAsync();
            try
            {
                
            }
            catch { }

            var IconStream = typeof(MainPage).GetTypeInfo().Assembly.GetManifestResourceStream("PowerfulTrainer.Images.BandIcon.png");
            var SmallIconStream = typeof(MainPage).GetTypeInfo().Assembly.GetManifestResourceStream("PowerfulTrainer.Images.BandSmallIcon.png");
            var Icon = await BandImage.FromStreamAsync(IconStream);
            var SmallIcon = await BandImage.FromStreamAsync(SmallIconStream);
            BandTile tile = new BandTile(tileGuid)
            {
                Name = "Powerful Trainer",
                Icon = Icon,
                SmallIcon = SmallIcon
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

        private async void SetTileData()
        {
            //await BandClient.TileManager.RemoveTilePagesAsync(tileGuid);
            PageData pageContent = new PageData()
            {
                PageId = pageGuid,
                PageLayoutIndex = 0,
            };
            var pageContentData = pageContent.Data;
            if (ExIndex < PlanData.Data.Count)
            {
                pageContentData.Add(new TextButtonData()
                {
                    ElementId = 1,
                    Text = "Next"
                });
                var PlanItem = PlanData.Data[ExIndex];
                pageContentData.Add(new WrappedTextBlockData()
                {
                    ElementId = 2,
                    Text = PlanItem.Name + " " + PlanItem.SubInfo,
                });
                pageContentData.Add(new TextBlockData()
                {
                    ElementId = 3,
                    Text = ExTimeSpan.Minutes.ToString("00") + ":" + ExTimeSpan.Seconds.ToString("00")
                });
            }
            else if (ExIndex == PlanData.Data.Count)
            {
                pageContentData.Add(new WrappedTextBlockData()
                {
                    ElementId = 2,
                    Text = "Well done. Have a nice day ^^"
                });
            }
            await BandClient.TileManager.SetTilePageDataAsync(tileGuid, pageContent);
        }

        private async Task ConnectBand()
        {
            var BandInfo = (await BandClientManager.Instance.GetPairedBandsAsync()).FirstOrDefault();
            BandClient = await BandClientManager.Instance.ConnectAsync(BandInfo);
            await BandClient.SensorManager.HeartRate.RequestUserConsent();
            BandClient.SensorManager.HeartRate.ReadingChanged += HeartRate_ReadingChanged;
            BandClient.SensorManager.Pedometer.ReadingChanged += Pedometer_ReadingChanged;
            BandClient.SensorManager.Calories.ReadingChanged += Calories_ReadingChanged;
            BandClient.TileManager.TileButtonPressed += TileManager_TileButtonPressed;
        }

        private void TileManager_TileButtonPressed(object sender, BandTileButtonPressedEventArgs e)
        {
            Device.BeginInvokeOnMainThread(() =>
            {
                SetWorkout();
            });
        }

        private double BeginCalories = 0;
        private void Calories_ReadingChanged(object sender, Microsoft.Band.Portable.Sensors.BandSensorReadingEventArgs<Microsoft.Band.Portable.Sensors.BandCaloriesReading> e)
        {
            if (BeginCalories == 0)
            {
                BeginCalories = e.SensorReading.Calories;
            }
            Device.BeginInvokeOnMainThread(() =>
            {
                CalValue.Text = (e.SensorReading.Calories - BeginCalories).ToString("0");
                CalChart(CalBar, PlanData.TotalCals, e.SensorReading.Calories - BeginCalories);
            });
        }

        private double BeginStep = 0;
        private void Pedometer_ReadingChanged(object sender, Microsoft.Band.Portable.Sensors.BandSensorReadingEventArgs<Microsoft.Band.Portable.Sensors.BandPedometerReading> e)
        {
            if (BeginStep == 0)
            {
                BeginStep = e.SensorReading.TotalSteps;
            }
            Device.BeginInvokeOnMainThread(() =>
            {
                StepValue.Text = (e.SensorReading.TotalSteps - BeginStep).ToString("0");
                CalChart(StepBar, PlanData.TotalSteps, e.SensorReading.TotalSteps - BeginStep);
            });
        }

        private List<int> ListHeartRate = new List<int>();
        private void HeartRate_ReadingChanged(object sender, Microsoft.Band.Portable.Sensors.BandSensorReadingEventArgs<Microsoft.Band.Portable.Sensors.BandHeartRateReading> e)
        {
            ListHeartRate.Add(e.SensorReading.HeartRate);
            Device.BeginInvokeOnMainThread(() =>
            {
                HeartValue.Text = ListHeartRate.Average().ToString("0");
                CalChart(HeartBar, PlanData.AvgHeartRate, ListHeartRate.Average());
            });
        }

        void NextBtn_Click(object sender, object args)
        {
            SetWorkout();
        }

        int ExIndex = -1;
        DispatcherTimer Timer = new DispatcherTimer();
        TimeSpan TotalTimeSpan = new TimeSpan();
        TimeSpan ExTimeSpan = new TimeSpan();
        private async void StartWorkout()
        {
            ExIndex = -1;
            NextBtn.Text = "Next";
            Workout.IsVisible = true;
            TotalTimeSpan = new TimeSpan();
            Timer.Start();
            SetWorkout();
            await BandClient.SensorManager.HeartRate.StartReadingsAsync();
            await BandClient.SensorManager.Pedometer.StartReadingsAsync();
            await BandClient.SensorManager.Calories.StartReadingsAsync();
            await BandClient.TileManager.StartEventListenersAsync();
        }

        private async void StopWorkout()
        {
            await BandClient.SensorManager.HeartRate.StopReadingsAsync();
            await BandClient.SensorManager.Pedometer.StopReadingsAsync();
            await BandClient.SensorManager.Calories.StopReadingsAsync();
            await BandClient.TileManager.StopEventListenersAsync();
            BeginStep = 0;
            BeginCalories = 0;
            ListHeartRate.Clear();
            Workout.IsVisible = false;
        }

        private void Timer_Tick(object sender, object e)
        {
            SetTileData();
            TotalTimeSpan = TotalTimeSpan.Add(TimeSpan.FromSeconds(1));
            TotalTime.Text = TotalTimeSpan.Hours.ToString("00") + ":" + TotalTimeSpan.Minutes.ToString("00") + ":" + TotalTimeSpan.Seconds.ToString("00");

            ExTimeSpan = ExTimeSpan.Add(TimeSpan.FromSeconds(1));
            ExTime.Text = ExTimeSpan.Hours.ToString("00") + ":" + ExTimeSpan.Minutes.ToString("00") + ":" + ExTimeSpan.Seconds.ToString("00");
        }

        private void SetWorkout()
        {
            ExIndex++;
            ExTimeSpan = new TimeSpan();
            if (ExIndex < PlanData.Data.Count)
            {
                var PlanItem = PlanData.Data[ExIndex];
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
            if (ExIndex == PlanData.Data.Count - 1)
            {
                NextBtn.Text = "Done";
            }
            //SetTileData();
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
                    BackgroundColor = Color.FromHex("#1565C0"),
                    HeightRequest = Height
                });
            }
            catch (Exception ex)
            { }
        }
    }
}