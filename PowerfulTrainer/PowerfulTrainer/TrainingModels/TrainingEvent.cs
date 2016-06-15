using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PowerfulTrainer.Shared.TrainingModels
{
    public class TrainingPlan
    {
        public List<TrainingEvent> PlanData { set; get; }
        public String Name { set; get; }
        public String PlanImage { set; get; }
    }

    public class TrainingEvent
    {
        public string Name {set;get;}
        public List<EventConditionBundle> Bundles { set; get; }
        public List<TrainingAction> Actions { set; get; }

        public bool Run()
        {
            var IsSuccess = false;
            foreach (var condition in Bundles)
            {
                if (condition.IsPass())
                {
                    IsSuccess = true;
                    Random Rand = new Random();
                    foreach (var action in Actions)
                    {
                            action.Execute();
                    }
                    break;
                }
            }
            return IsSuccess;
        }
    }
}
