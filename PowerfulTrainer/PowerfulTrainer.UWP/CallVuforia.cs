using PowerfulTrainer.UWP;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;

[assembly: Dependency(typeof(CallVuforia))]
namespace PowerfulTrainer.UWP
{
    public class CallVuforia: ICallVuforia
    {
        public void Call()
        {

        }
    }
}
