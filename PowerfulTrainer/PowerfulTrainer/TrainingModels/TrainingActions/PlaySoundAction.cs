using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;

namespace PowerfulTrainer
{
    public class PlaySoundAction: TrainingAction
    {
        public string FileName;
        public override void Execute()
        {
            var Implement = DependencyService.Get<PlaySoundAction>();
            Implement.FileName = FileName;
            Implement.Execute();
        }
    }
}
