using PowerfulTrainer;
using PowerfulTrainer.UWP;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Windows.Media.Playback;
using Xamarin.Forms.Platform.UWP;

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
                Element.HandleSource += Element_HandleSource;
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
                Control.Source = new Uri(Element.Source);
            }
        }

        private object Element_HandleSource(VideoPlayer Sender)
        {
            Control.Source = new Uri(Sender.Source);
            return Sender.Source;
        }
    }
}
