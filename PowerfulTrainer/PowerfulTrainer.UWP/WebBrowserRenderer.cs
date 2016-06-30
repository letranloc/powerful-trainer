using PowerfulTrainer;
using PowerfulTrainer.UWP;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms.Platform.UWP;
using Windows.UI.Xaml.Controls;
using System.ComponentModel;

[assembly: ExportRenderer(typeof(WebBrowser), typeof(WebBrowserRenderer))]
namespace PowerfulTrainer.UWP
{
    public class WebBrowserRenderer : ViewRenderer<WebBrowser, Windows.UI.Xaml.Controls.WebView>
    {
        const string JavaScriptFunction = "function invokeCSharpAction(data){window.external.notify(data);}";
        protected override void OnElementChanged(ElementChangedEventArgs<WebBrowser> e)
        {
            base.OnElementChanged(e);

            if (Control == null)
            {
                Element.OnBack += OnBack;
                Element.HandleCanGoBack += HandleCanGoBack;
                SetNativeControl(new Windows.UI.Xaml.Controls.WebView());
            }
            if (e.OldElement != null)
            {
                Control.NavigationCompleted -= OnWebViewNavigationCompleted;
                Control.ScriptNotify -= OnWebViewScriptNotify;
            }
            if (e.NewElement != null)
            {
                Control.NavigationCompleted += OnWebViewNavigationCompleted;
                Control.ScriptNotify += OnWebViewScriptNotify;
                Control.Source = new Uri(Element.Uri);
            }
        }
        protected override void OnElementPropertyChanged(object sender, PropertyChangedEventArgs e)
        {
            base.OnElementPropertyChanged(sender, e);
            if(e.PropertyName==WebBrowser.UriProperty.PropertyName)
            {
                Control.Source = new Uri(Element.Uri);
            }
        }

        private object HandleCanGoBack(WebBrowser Sender)
        {
            return Control.CanGoBack;
        }

        private void OnBack(WebBrowser Sender)
        {
            Control.GoBack();
        }

        async void OnWebViewNavigationCompleted(WebView sender, WebViewNavigationCompletedEventArgs args)
        {
            if (args.IsSuccess)
            {
                var Result = await Control.InvokeScriptAsync("eval", new[] { JavaScriptFunction });
            }
           
        }

        void OnWebViewScriptNotify(object sender, NotifyEventArgs e)
        {
            Element.JsNotify(e.Value);
        }
    }
}
