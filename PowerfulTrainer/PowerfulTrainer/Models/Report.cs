using System;
using System.Collections.Generic;
using System.Linq;

namespace PowerfulTrainer
{
    public class AddReportReq
    {
        public int PlanID;
        public DateTime BeginTime;
        public int Duration;
        public float AvgHeartRate;
        public float TotalCals;
        public float TotalSteps;
    }
}