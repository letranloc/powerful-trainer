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
using System.ComponentModel;

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
                Element.PlayEvent += Element_PlayEvent;
                Element.StopEvent += Element_StopEvent;
                var VideoHolder = new VideoView(Context);
                VideoHolder.SetMediaController(new MediaController(Context));
                SetNativeControl(VideoHolder);

            }
            if (e.OldElement != null)
            {

            }
            if (e.NewElement != null)
            {
            }
        }

        protected override void OnElementPropertyChanged(object sender, PropertyChangedEventArgs e)
        {
            base.OnElementPropertyChanged(sender, e);
            if(e.PropertyName==VideoPlayer.SourceProperty.PropertyName)
            {
                if (Element.Source != null)
                {
                    var uri = Android.Net.Uri.Parse(Element.Source);
                    Control.SetVideoURI(uri);
                    Control.SeekTo(500);
                }
            }
        }

        private object Element_StopEvent(VideoPlayer Sender)
        {
            Control.StopPlayback();
            return true;
        }

        private object Element_PlayEvent(VideoPlayer Sender)
        {
            Control.Start();
            return true;
        }
    }
}