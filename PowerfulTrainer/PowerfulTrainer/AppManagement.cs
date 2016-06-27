using Newtonsoft.Json;
using PowerfulTrainer.Models;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PowerfulTrainer
{
    public class AppManagement
    {
        public static bool IsOnline;
        public static List<TrainingEvent> Events = new List<TrainingEvent>();
        public static string AccessToken { set; get; }
        public static bool IsEventRuning = false;

        private static async void ObserveEvent()
        {
            while (true)
            {
                await Task.Delay(1000);
                if (IsEventRuning)
                {
                    {
                        foreach (var trainingEvent in Events)
                        {
                            trainingEvent.Run();
                        }
                    }
                }
            }
        }

        public static async void Init()
        {
            var Result = await HttpClient.Get<ApiResponse>("http://aloraha.com/api/event");
            Events = JsonConvert.DeserializeObject<List<TrainingEvent>>(Result.Data as string, new JsonSerializerSettings()
            {
                TypeNameAssemblyFormat = System.Runtime.Serialization.Formatters.FormatterAssemblyStyle.Simple,
                TypeNameHandling = TypeNameHandling.Auto
            });
            ObserveEvent();
        }
    }
}
