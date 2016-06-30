using PowerfulTrainer;
using PowerfulTrainer.UWP;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Windows.Media.Playback;
using Xamarin.Forms.Platform.UWP;
using System.ComponentModel;

[assembly: ExportRenderer(typeof(VideoPlayer), typeof(VideoPlayerRenderer))]
namespace PowerfulTrainer.UWP
{
    public class VideoPlayerRenderer:ViewRenderer<VideoPlayer, Windows.UI.Xaml.Controls.MediaElement>
    {
        protected override void OnElementChanged(ElementChangedEventArgs<VideoPlayer> e)
        {
            base.OnElementChanged(e);

            if (Control == null)
            {
                Element.StopEvent += Element_StopEvent;
                Element.PlayEvent += Element_PlayEvent;
                SetNativeControl(new Windows.UI.Xaml.Controls.MediaElement()
                {
                    AutoPlay = false,
                    AreTransportControlsEnabled = true
                });
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
                    Control.Source = new Uri(Element.Source);
                }
            }
        }

        private object Element_PlayEvent(VideoPlayer Sender)
        {
            Control.Play();
            return true;
        }

        private object Element_StopEvent(VideoPlayer Sender)
        {
            Control.Stop();
            return true;
        }
    }
}
