using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PowerfulTrainer.Shared.TrainingModels
{
    public abstract class EventCondition
    {
        public abstract bool IsPass();
    }
    public class EventConditionBundle
    {
        public List<EventCondition> Conditions { set; get; }
        public bool IsPass()
        {
            foreach (var condition in Conditions)
            {
                if (!condition.IsPass())
                {
                    return false;
                }
            }
            return true;
        }
    }
}
