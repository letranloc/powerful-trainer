using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using PowerfulTrainer.Droid;
using Xamarin.Forms;

[assembly: Dependency(typeof(CallVuforia))]
namespace PowerfulTrainer.Droid
{
    public class CallVuforia : ICallVuforia
    {
        public void Call()
        {
            var Laucher = Android.App.Application.Context.ApplicationContext.PackageManager.GetLaunchIntentForPackage("vn.edu.hcmus.powerfultrainercard");
            Android.App.Application.Context.ApplicationContext.StartActivity(Laucher);
        }
    }
}