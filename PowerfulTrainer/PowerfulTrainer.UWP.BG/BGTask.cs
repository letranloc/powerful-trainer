using Microsoft.Band;
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

        private async Task SetupBand()
        {

            var BandInfo = (await BandClientManager.Instance.GetBandsAsync(true)).FirstOrDefault();
            try
            {
                BandClient = BandClientManager.Instance.ConnectAsync(BandInfo).Result;
            }
            catch(Exception EX)
            {

            }
            BandClient.SensorManager.HeartRate.GetCurrentUserConsent();
            BandClient.SensorManager.Pedometer.GetCurrentUserConsent();
            
            BandClient.SensorManager.Pedometer.ReadingChanged += (sender, e) =>
             {
                 if ((DateTime.Now - CurrentTime).TotalSeconds > 1)
                 {
                     CurrentTime = DateTime.Now;
                     ToastVisual Visual = new ToastVisual()
                     {
                         TitleText = new ToastText() { Text = "PowerfulTrainer" },
                         BodyTextLine1 = new ToastText() { Text = e.SensorReading.StepsToday.ToString() }
                     };
                     ToastContent Content = new ToastContent()
                     {
                         Visual = Visual
                     };
                     var toast = new ToastNotification(Content.GetXml());
                     ToastNotificationManager.CreateToastNotifier().Show(toast);
                 }
             };
            await BandClient.SensorManager.Pedometer.StartReadingsAsync();
        }

        private void Pedometer_ReadingChanged(object sender, Microsoft.Band.Sensors.BandSensorReadingEventArgs<Microsoft.Band.Sensors.IBandPedometerReading> e)
        {
            ToastVisual Visual = new ToastVisual()
            {
                TitleText = new ToastText() { Text = "PowerfulTrainer" },
                BodyTextLine1 = new ToastText() { Text = e.SensorReading.StepsToday.ToString() }
            };
            ToastContent Content = new ToastContent()
            {
                Visual = Visual
            };
            var toast = new ToastNotification(Content.GetXml());
            ToastNotificationManager.CreateToastNotifier().Show(toast);
        }
    }
}
