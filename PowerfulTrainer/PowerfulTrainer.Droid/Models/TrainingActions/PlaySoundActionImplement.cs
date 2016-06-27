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
using PowerfulTrainer.Droid.Models.TrainingActions;
using Android.Media;

[assembly: Xamarin.Forms.Dependency(typeof(PlaySoundActionImplement))]
namespace PowerfulTrainer.Droid.Models.TrainingActions
{
    public class PlaySoundActionImplement:PlaySoundAction
    {
        public override void Execute()
        {
            var Player = new MediaPlayer();
            var fd = global::Android.App.Application.Context.Assets.OpenFd(FileName);
            Player.Prepared += (s, e) =>
            {
                Player.Start();
            };
            Player.SetDataSource(fd.FileDescriptor, fd.StartOffset, fd.Length);
            Player.Prepare();
        }
    }
}