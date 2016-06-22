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
            CreateBandTitle();
        }


        private void Browser_OnJsNotify(WebBrowser Sender, string Data)
        {
            var Key = Data.Substring(0, Data.IndexOf(':')).ToLower();
            var Value = Data.Substring(Data.IndexOf(':') + 1);
            if (Key == "token")
            {
                AppManagement.AccessToken = Value;
            }
            if(Key=="plan")
            {
                try
                {
                    var PlanData = JsonConvert.DeserializeObject<PlanData>(Value);
                    PlanData = OptimizePlanData(PlanData);
                    DependencyService.Get<IFileManagement>().SaveText("data", JsonConvert.SerializeObject(PlanData));
                    DisplayAlert("Sync success", "Please open tile in Band when start workout", "OK");
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
            foreach (var Exercise in PlanData.Data)
            {
                for (int i = 0; i < Exercise.Sets; i++)
                {
                    string ExtraInfo = " (";
                    if (!String.IsNullOrEmpty(Exercise.Duration))
                    {
                        TimeSpan timediff = new TimeSpan(0, 0, int.Parse(Exercise.Duration));
                        ExtraInfo += timediff.Minutes.ToString("00") + ":" + timediff.Seconds.ToString("00") + ")";
                    }
                    else
                    {
                        if(Exercise.Repetitions != null && Exercise.Repetitions>0)
                        {
                            ExtraInfo += Exercise.Repetitions + " rep)";
                        }
                        else
                        {
                            ExtraInfo += "max rep)";
                        }
                    }

                    TmpData.Data.Add(new PlanItem()
                    {
                        Duration = Exercise.Duration,
                        Repetitions = Exercise.Repetitions,
                        Name = Exercise.Name + (Exercise.Sets > 1 ? (" Set " + (i + 1) + "/" + Exercise.Sets) : "") + ExtraInfo
                    });
                    if (i < Exercise.Sets - 1)
                    {
                        if (!string.IsNullOrEmpty(Exercise.RestTime))
                        {
                            int tmp;
                            string RestName ="";
                            if (int.TryParse(Exercise.RestTime, out tmp))
                            {
                                TimeSpan timediff = new TimeSpan(0, 0, tmp);
                                RestName = "Rest (" + timediff.Minutes.ToString("00") + ":" + timediff.Seconds.ToString("00") + ")";
                            }
                            else
                            {
                                RestName = "Rest (" + Exercise.RestTime + ")";
                            }
                            TmpData.Data.Add(new PlanItem()
                            {
                                Duration = Exercise.RestTime,
                                Name = RestName,
                                IsRestItem = true
                            });
                        }
                    }
                }
            }
            return TmpData;
        }

        Guid tileGuid = new Guid(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
        BandClient BandClient = null;
        private async void CreateBandTitle()
        {
            var BandInfo = (await BandClientManager.Instance.GetPairedBandsAsync()).FirstOrDefault();
            BandClient = await BandClientManager.Instance.ConnectAsync(BandInfo);

            try
            {
                await BandClient.TileManager.RemoveTileAsync(tileGuid);
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
                SmallIcon= SmallIcon
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
            });

            panel.Elements.Add(new TextBlock
            {
                ElementId = 3,
                Rect = new PageRect(2, 90, 270, 50),
                AutoWidth = true
            });


            FilledPanel panel2 = new FilledPanel
            {
                Rect = new PageRect(0, 0, 270, 120),
            };

            panel.Elements.Add(new TextBlock
            {
                ElementId = 4,
                Rect = new PageRect(2, 2, 270, 50),
                AutoWidth = true
            });

            panel.Elements.Add(new TextBlock
            {
                ElementId = 5,
                Rect = new PageRect(50, 2, 270, 50),
                AutoWidth = true
            });

            panel.Elements.Add(new TextBlock
            {
                ElementId = 6,
                Rect = new PageRect(2, 45, 270, 50),
                AutoWidth = true
            });

            panel.Elements.Add(new TextBlock
            {
                ElementId = 7,
                Rect = new PageRect(50, 45, 270, 50),
                AutoWidth = true
            });

            panel.Elements.Add(new TextBlock
            {
                ElementId = 8,
                Rect = new PageRect(2, 90, 270, 50),
                AutoWidth = true
            });

            panel.Elements.Add(new TextBlock
            {
                ElementId = 9,
                Rect = new PageRect(50, 90, 270, 50),
                AutoWidth = true
            });

            PageLayout layout = new PageLayout(panel);
            PageLayout layout2 = new PageLayout(panel2);


            tile.PageLayouts.Add(layout);
            tile.PageLayouts.Add(layout2);
            try
            {
                await BandClient.TileManager.AddTileAsync(tile);
                await BandClient.DisconnectAsync();
            }
            catch { }

        }

    }
}