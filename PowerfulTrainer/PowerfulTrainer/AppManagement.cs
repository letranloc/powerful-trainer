using PowerfulTrainer.Shared.TrainingModels;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PowerfulTrainer
{
    public class SuccessEvent
    {
        public string EventName { set; get; }
        public String Time { set; get; }
    }

    public class AppManagement
    {
        public static bool IsOnline;
        public static List<TrainingEvent> Events;
        public static string AccessToken { set; get; }

        public static async void Run()
        {
            //BandManagement.Update();
            //await ObserveEvent();
        }


        private static bool IsStopWorkout = true;
        private static async Task ObserveEvent()
        {
            while (true)
            {
                await Task.Delay(1000);
                if (!IsStopWorkout)
                {
                    foreach (var trainingEvent in Events)
                    {
                        trainingEvent.Run();                       
                    }
                }
            }
        }
        public static void DoWorkout()
        {
            IsStopWorkout = false;
            BandManagement.Reset();
        }
        public static void StopWorkout()
        {
            IsStopWorkout = true;
        }
    }
}
