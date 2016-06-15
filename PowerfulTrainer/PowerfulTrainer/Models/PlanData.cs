using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PowerfulTrainer.Models
{
    public class PlanItem
    {
        public int ExerciseId;
        public int Sets;
        public int Repetitions;
        public string Duration;
        public string RestTime;
        public bool IsRestItem;
    }
    public class PlanData : List<PlanItem> { }
}
