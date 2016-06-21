using Microsoft.Band;
using Microsoft.Band.Tiles.Pages;
using NotificationsExtensions.Toasts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Windows.ApplicationModel.Background;
using Windows.Devices.Bluetooth.Rfcomm;
using Windows.Devices.Enumeration;
using Windows.Foundation;
using Windows.UI.Notifications;

namespace PowerfulTrainer.UWP.BG
{
    public sealed class BGTask : IBackgroundTask
    {
        BackgroundTaskDeferral Deferral;
        DateTime CurrentTime = new DateTime();
        IBandClient BandClient;
        public async void Run(IBackgroundTaskInstance taskInstance)
        {
            Deferral = taskInstance.GetDeferral();
            await SetupBand();
        }

        public IAsyncAction SetupBandAsync()
        {
            return SetupBand().AsAsyncAction();
        }
        Guid tileGuid = new Guid(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
        private async Task SetupBand()
        {

            var BandInfo = (await BandClientManager.Instance.GetBandsAsync(true)).FirstOrDefault();
            try
            {
                BandClient = BandClientManager.Instance.ConnectAsync(BandInfo).Result;
            }
            catch { }
            BandClient.TileManager.TileButtonPressed += TileManager_TileButtonPressed;
            BandClient.TileManager.TileOpened += TileManager_TileOpened;
            BandClient.TileManager.TileClosed += TileManager_TileClosed;
            BandClient.SensorManager.HeartRate.GetCurrentUserConsent();
            BandClient.SensorManager.Pedometer.GetCurrentUserConsent();

            BandClient.SensorManager.Pedometer.ReadingChanged += Pedometer_ReadingChanged;
            await BandClient.SensorManager.Pedometer.StartReadingsAsync();
            await BandClient.TileManager.StartReadingsAsync();
            
        }

        private void TileManager_TileClosed(object sender, Microsoft.Band.Tiles.BandTileEventArgs<Microsoft.Band.Tiles.IBandTileClosedEvent> e)
        {
            if(e.TileEvent.TileId.Equals(tileGuid))
            {

            }
        }
        static DateTime BeginTime = new DateTime();
        private async void TileManager_TileOpened(object sender, Microsoft.Band.Tiles.BandTileEventArgs<Microsoft.Band.Tiles.IBandTileOpenedEvent> e)
        {
            if (e.TileEvent.TileId.Equals(tileGuid))
            {
                BeginTime = DateTime.Now;
                Guid pageGuid = new Guid(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12);

                var pageContentData = new List<PageElementData>();
                pageContentData.Add(new TextButtonData(1, "Next"));
                pageContentData.Add(new TextBlockData(2, "Exercise " ));

                PageData pageContent = new PageData(pageGuid, 0, pageContentData);


                var Result = await BandClient.TileManager.SetPagesAsync(tileGuid, pageContent);
            }
        }

        private async void TileManager_TileButtonPressed(object sender, Microsoft.Band.Tiles.BandTileEventArgs<Microsoft.Band.Tiles.IBandTileButtonPressedEvent> e)
        {
            Guid pageGuid = new Guid(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12);

            var pageContentData = new List<PageElementData>();
            pageContentData.Add(new TextButtonData(1, "Next"));
            pageContentData.Add(new TextBlockData(2, "Exercise "+(new Random()).Next()));

            PageData pageContent = new PageData(pageGuid, 0, pageContentData);


            var Result = await BandClient.TileManager.SetPagesAsync(tileGuid, pageContent);
        }

        private async void Pedometer_ReadingChanged(object sender, Microsoft.Band.Sensors.BandSensorReadingEventArgs<Microsoft.Band.Sensors.IBandPedometerReading> e)
        {
            //ToastVisual Visual = new ToastVisual()
            //{
            //    TitleText = new ToastText() { Text = "PowerfulTrainer" },
            //    BodyTextLine1 = new ToastText() { Text = e.SensorReading.StepsToday.ToString() }
            //};
            //ToastContent Content = new ToastContent()
            //{
            //    Visual = Visual
            //};
            //var toast = new ToastNotification(Content.GetXml());
            //ToastNotificationManager.CreateToastNotifier().Show(toast);

            {
                Guid pageGuid = new Guid(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12);

                var pageContentData = new List<PageElementData>();
                pageContentData.Add(new TextButtonData(1, "Next"));
                pageContentData.Add(new TextBlockData(2, "Exercise "));
                pageContentData.Add(new TextBlockData(3, (DateTime.Now - BeginTime).TotalSeconds.ToString()));
                PageData pageContent = new PageData(pageGuid, 0, pageContentData);


                var Result = await BandClient.TileManager.SetPagesAsync(tileGuid, pageContent);
            }

        }
    }
}
