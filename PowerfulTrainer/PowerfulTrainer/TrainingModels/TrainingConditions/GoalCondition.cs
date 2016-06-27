using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PowerfulTrainer
{
    public class GoalStepCondition:EventCondition
    {
        private bool IsDone = false;
        public override bool IsPass()
        {
            if (!IsDone)
            {
                if (BandManagement.GetValue(BandSensorType.Step) > WorkoutManagement.PlanData.TotalSteps - 10)
                {
                    IsDone = true;
                    return true;
                }
            }
            return false;
        }
    }

    public class GoalHeartRateCondition : EventCondition
    {
        private bool IsDone = false;
        public override bool IsPass()
        {
            if (!IsDone)
            {
                if (BandManagement.GetValue(BandSensorType.HeartRate) > WorkoutManagement.PlanData.AvgHeartRate - 3)
                {
                    IsDone = true;
                    return true;
                }
            }
            return false;
        }
    }

    public class GoalCalCondition : EventCondition
    {
        private bool IsDone = false;
        public override bool IsPass()
        {
            if (!IsDone)
            {
                if (BandManagement.GetValue(BandSensorType.Calories) > WorkoutManagement.PlanData.TotalCals - 2)
                {
                    IsDone = true;
                    return true;
                }
            }
            return false;
        }
    }
}
