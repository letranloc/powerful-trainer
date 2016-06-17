using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PowerfulTrainer.Models
{
    public class PlanItem
    {
        public int Id;
        public string Name;
        public int Sets;
        //Chi set gia tri 1 trong 2 Repetition hoac Duration
        //So lan trong 1 set
        public int? Repetitions;
        //Thoi gian 1 set
        public string Duration;
        //Thoi gian nghi giua cac set
        public string RestTime;
        public bool IsRestItem;
    }
    public class PlanData : List<PlanItem> { }
}
