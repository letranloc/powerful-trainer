using Microsoft.Band;
using Microsoft.Band.Portable;
using Microsoft.Band.Portable.Tiles;
using Microsoft.Band.Portable.Tiles.Pages;
using Microsoft.Band.Portable.Tiles.Pages.Data;
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
                    DependencyService.Get<IFileManagement>().SaveText("data", Value);
                    DisplayAlert("Sync success", "Please open tile in Band when start workout", "OK");
                }
                catch
                {
                    DisplayAlert("Something went wrong", "Please try again.", "OK");
                }
            }
        }
        Guid tileGuid = new Guid(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
        BandClient BandClient = null;
        private async void CreateBandTitle()
        {
            var BandInfo = (await BandClientManager.Instance.GetPairedBandsAsync()).FirstOrDefault();            BandClient = await BandClientManager.Instance.ConnectAsync(BandInfo);

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
                PressedColor = new BandColor(0xFF, 0x00, 0x00),
            });            panel.Elements.Add(new TextBlock
            {
                ElementId = 2,
                Rect = new PageRect(5, 2, 270, 50),
                AutoWidth = true
            });            panel.Elements.Add(new TextBlock
            {
                ElementId = 3,
                Rect = new PageRect(150, 2, 270, 50),
                AutoWidth = true
            });            PageLayout layout = new PageLayout(panel);

           
            tile.PageLayouts.Add(layout);
            try
            {
                await BandClient.TileManager.AddTileAsync(tile);

                //Guid pageGuid = new Guid(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12);
                //PageData pageContent = new PageData()
                //{
                //    PageId = pageGuid,
                //    PageLayoutIndex = 0,
                //};
                //pageContent.Data.Add(new TextButtonData()
                //{
                //    ElementId = 1,
                //    Text = "Next"
                //});
                //pageContent.Data.Add(new TextBlockData()
                //{
                //    ElementId = 2,
                //    Text = "Exercise"
                //});
                //await BandClient.TileManager.SetTilePageDataAsync(tileGuid, pageContent);
                await BandClient.DisconnectAsync();
            }
            catch { }

        }

    }
}