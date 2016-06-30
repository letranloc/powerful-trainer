using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;

namespace PowerfulTrainer
{
    public class WebBrowser : View
    {
        public delegate void OnJsNotifyEvent(WebBrowser Sender, String Data);
        public delegate void OnRendererRequestEvent(WebBrowser Sender);
        public delegate object OnRendererHandleEvent(WebBrowser Sender);

        public event OnRendererRequestEvent OnBack = null;
        public event OnJsNotifyEvent OnJsNotify = null;
        public event OnRendererHandleEvent HandleCanGoBack = null;


        public static readonly BindableProperty UriProperty = BindableProperty.Create(
            propertyName: "Uri",
            returnType: typeof(string),
            declaringType: typeof(WebBrowser),
            defaultValue: default(string)
        );
        public string Uri
        {
            get { return (string)GetValue(UriProperty); }
            set { SetValue(UriProperty, value);}
        }
        
        public void JsNotify(string Data)
        {
            if(OnJsNotify!=null)
            {
                OnJsNotify(this, Data);
            }
        }

        public void Cleanup()
        {
            OnJsNotify = null;
            //OnBack = null;
        }

        public bool CanGoBack()
        {
            if(HandleCanGoBack!=null)
            {
                return (bool)HandleCanGoBack(this);
            }
            return false;
        }

        public void GoBack()
        {
            if(OnBack!=null)
            {
                OnBack(this);
            }
        }
    }
}
