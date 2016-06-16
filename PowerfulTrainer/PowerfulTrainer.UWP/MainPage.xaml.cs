using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using Windows.ApplicationModel.Background;
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
            RegisterBackground();
            LoadApplication(new PowerfulTrainer.App());
        }

        private async void RegisterBackground()
        {
            var taskRegistered = false;
            var exampleTaskName = "BackgroundTask";

            foreach (var task in BackgroundTaskRegistration.AllTasks)
            {
                if (task.Value.Name == exampleTaskName)
                {
                    taskRegistered = true;
                    break;
                }
            }
            if(!taskRegistered)
            {
                var builder = new BackgroundTaskBuilder();

                builder.Name = exampleTaskName;
                builder.TaskEntryPoint = "PowerfulTrainer.UWP.Background.BackgroundTask";
                builder.SetTrigger(new TimeTrigger(15,false));
                builder.Register();
               
            }
           
        }
    }
}
