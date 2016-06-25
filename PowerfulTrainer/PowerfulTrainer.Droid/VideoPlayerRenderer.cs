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
using Xamarin.Forms;
using PowerfulTrainer;
using PowerfulTrainer.Droid;
using Xamarin.Forms.Platform.Android;
using Android.Net;

[assembly: ExportRenderer(typeof(VideoPlayer), typeof(VideoPlayerRenderer))]
namespace PowerfulTrainer.Droid
{
    public class VideoPlayerRenderer:ViewRenderer<VideoPlayer, VideoView>
    {
        protected override void OnElementChanged(ElementChangedEventArgs<VideoPlayer> e)
        {
            base.OnElementChanged(e);

            if (Control == null)
            {
                Element.HandleSource += Element_HandleSource;
                var VideoHolder = new VideoView(Context);
                VideoHolder.SetMediaController(new MediaController(Context));
                SetNativeControl(VideoHolder);

            }
            if (e.OldElement != null)
            {

            }
            if (e.NewElement != null)
            {
                if (Element.Source != null)
                {
                    Control.SetVideoURI(Android.Net.Uri.Parse(Element.Source));
                }
            }
        }

        private object Element_HandleSource(VideoPlayer Sender)
        {
            var uri = Android.Net.Uri.Parse(Element.Source);
            Control.SetVideoURI(uri);
            Control.Start();
            return Sender.Source;
        }
    }
}