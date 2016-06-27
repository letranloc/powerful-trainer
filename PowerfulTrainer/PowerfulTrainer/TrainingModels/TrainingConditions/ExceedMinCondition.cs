using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PowerfulTrainer.TrainingModels.TrainingConditions
{
    public class ExceedMinCondition : EventCondition
    {
        private bool IsDone = false;
        [JsonConverter(typeof(StringEnumConverter))]
        public BandSensorType SensorType;
        public double Value;
        public override bool IsPass()
        {
            if (!IsDone)
            {
                if (BandManagement.GetValue(SensorType) < Value)
                {
                    return true;
                }
            }
            return false;
        }
    }
}
