using Microsoft.Band;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Threading.Tasks;
using Windows.ApplicationModel.Background;
using Windows.Devices.Bluetooth.Rfcomm;
using Windows.Devices.Enumeration;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.System.Display;
using Windows.UI.Popups;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Primitives;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Input;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Navigation;

namespace PowerfulTrainer.UWP
{
    public sealed partial class MainPage
    {
        public MainPage()
        {
            this.InitializeComponent();
            var g_DisplayRequest = new DisplayRequest();
            g_DisplayRequest.RequestActive();
            CheckBandTask();
            //LoadApplication(new PowerfulTrainer.App());
        }

        static string taskName = "BandTask";

        public async void CheckBandTask()
        {
            var BGTask = BackgroundTaskRegistration.AllTasks.FirstOrDefault(u => u.Value.Name == taskName).Value;
            if(BGTask!=null)
            {
                BGTask.Unregister(false);
            }
            await Task.Delay(10000);
            await RegisterBandDataTask();
        }

        public static async Task<bool> RegisterBandDataTask()
        {
            try
            {
                var access = await BackgroundExecutionManager.RequestAccessAsync();

                if ((access == BackgroundAccessStatus.AllowedMayUseActiveRealTimeConnectivity) || (access == BackgroundAccessStatus.AllowedWithAlwaysOnRealTimeConnectivity))
                {
                    var taskBuilder = new BackgroundTaskBuilder { Name = taskName, TaskEntryPoint = "PowerfulTrainer.UWP.BG.BGTask" };
                    var deviceUseTrigger = new DeviceUseTrigger();
                    
                    taskBuilder.SetTrigger(deviceUseTrigger);
                    taskBuilder.Register();
                    var bandInfo = (await BandClientManager.Instance.GetBandsAsync()).FirstOrDefault();
                    var device = (await DeviceInformation.FindAllAsync(RfcommDeviceService.GetDeviceSelector(RfcommServiceId.FromUuid(new Guid("A502CA9A-2BA5-413C-A4E0-13804E47B38F"))))).FirstOrDefault(x => x.Name == bandInfo.Name);
                    var triggerResult = await deviceUseTrigger.RequestAsync(device.Id);
                    switch (triggerResult)
                    {
                        case DeviceTriggerResult.DeniedByUser:
                            throw new InvalidOperationException("Cannot start the background task. Access denied by user.");
                        case DeviceTriggerResult.DeniedBySystem:
                            throw new InvalidOperationException("Cannot start the background task. Access denied by system.");
                        case DeviceTriggerResult.LowBattery:
                            throw new InvalidOperationException("Cannot start the background task. Low battery.");
                    }
                    
                    return true;
                }
            }
            catch (Exception ex)
            {
                // ToDo 
            }

            return false;
        }
    }
}
