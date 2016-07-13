using PowerfulTrainer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PowerfulTrainer
{
    public class WorkoutManagement
    {
        private static PlanData _PlanData;
        public static PlanData PlanData
        {
            set
            {
                _PlanData = OptimizePlanData(value);
            }
            get
            {
                return _PlanData;
            }
        }

        private static PlanData OptimizePlanData(PlanData PlanData)
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
                        VideoUrl = Exercise.VideoUrl,
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
    }
}
