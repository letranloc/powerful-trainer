using Microsoft.Band;
using Microsoft.Band.Tiles.Pages;
using Newtonsoft.Json;
using NotificationsExtensions.Toasts;
using PowerfulTrainer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Windows.ApplicationModel.Background;
using Windows.Devices.Bluetooth.Rfcomm;
using Windows.Devices.Enumeration;
using Windows.Foundation;
using Windows.Storage;
using Windows.UI.Notifications;

namespace PowerfulTrainer.UWP.BG
{
    public sealed class BGTask : IBackgroundTask
    {
        BackgroundTaskDeferral Deferral;
        IBandClient BandClient;

        Guid pageGuid = new Guid(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12);
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
            if (e.TileEvent.TileId.Equals(tileGuid))
            {
                IsBegin = true;
                Index = null;
            }
        }
        static DateTime BeginTime = new DateTime();
        static DateTime BeginExerciseTime = new DateTime();
        static PlanData PlanData;
        static bool IsBegin = true;
        static int? Index = null;
        private async void TileManager_TileOpened(object sender, Microsoft.Band.Tiles.BandTileEventArgs<Microsoft.Band.Tiles.IBandTileOpenedEvent> e)
        {
            if (!IsBegin)
            {
                return;
            }
            IsBegin = false;
            if (e.TileEvent.TileId.Equals(tileGuid))
            {
                BeginTime = DateTime.Now;
                var pageContentData = new List<PageElementData>();
                try
                {
                    StorageFolder storageFolder = ApplicationData.Current.LocalFolder;
                    StorageFile sampleFile = await storageFolder.GetFileAsync("data");
                    string text = await FileIO.ReadTextAsync(sampleFile);
                    PlanData = JsonConvert.DeserializeObject<PlanData>(text);

                    pageContentData.Add(new TextButtonData(1, "Start"));
                    pageContentData.Add(new WrappedTextBlockData(2, "Welcome to PowerfulTrainer"));
                }
                catch (Exception ex)
                {
                    pageContentData.Add(new TextButtonData(1, ""));
                    pageContentData.Add(new WrappedTextBlockData(2, "Please sync workout plan from mobile "));
                }
                PageData pageContent = new PageData(pageGuid, 0, pageContentData);
                var Result = await BandClient.TileManager.SetPagesAsync(tileGuid, pageContent);
            }
        }

        private void TileManager_TileButtonPressed(object sender, Microsoft.Band.Tiles.BandTileEventArgs<Microsoft.Band.Tiles.IBandTileButtonPressedEvent> e)
        {
            if (Index == null) { Index = -1; }
            Index++;
            BeginExerciseTime = DateTime.Now;
            SetBandData();
        }
        static object LockObj = new object();
        private void SetBandData()
        {
            lock (LockObj)
            {
                if (Index != null)
                {
                    var pageContentData = new List<PageElementData>();
                    if (Index < PlanData.Data.Count)
                    {
                        pageContentData.Add(new TextButtonData(1, "Next"));
                        pageContentData.Add(new WrappedTextBlockData(2, PlanData.Data[Index.Value].Name));
                        var TimeDiff = DateTime.Now - BeginExerciseTime;
                        pageContentData.Add(new TextBlockData(3, TimeDiff.Minutes.ToString("00") + ":" + TimeDiff.Seconds.ToString("00")));
                    }
                    else if (Index == PlanData.Data.Count)
                    {
                        pageContentData.Add(new TextButtonData(1, null));
                        pageContentData.Add(new WrappedTextBlockData(2, "Well done. Have a nice day ^^"));
                    }

                    PageData pageContent = new PageData(pageGuid, 0, pageContentData);
                    var Result = BandClient.TileManager.SetPagesAsync(tileGuid, pageContent).Result;
                }
            }
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


                //var pageContentData = new List<PageElementData>();
                //pageContentData.Add(new TextButtonData(1, "Next"));
                //pageContentData.Add(new TextBlockData(2, "Exercise "));
                //pageContentData.Add(new TextBlockData(3, (DateTime.Now - BeginTime).TotalSeconds.ToString()));
                //PageData pageContent = new PageData(pageGuid, 0, pageContentData);


                //var Result = await BandClient.TileManager.SetPagesAsync(tileGuid, pageContent);
            }
            SetBandData();

        }
    }
}
