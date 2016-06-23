using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;

namespace PowerfulTrainer
{
    public class VideoPlayer:View
    {
        public delegate object OnRendererHandleEvent(VideoPlayer Sender);
        public static readonly BindableProperty SourceProperty = BindableProperty.Create(
           propertyName: "Source",
           returnType: typeof(string),
           declaringType: typeof(WebBrowser),
           defaultValue: default(string)
       );
        public string Source
        {
            get { return (string)GetValue(SourceProperty); }
            set { SetValue(SourceProperty, value); HandleSource(this); }
        }

        public event OnRendererHandleEvent HandleSource;
    }
}
