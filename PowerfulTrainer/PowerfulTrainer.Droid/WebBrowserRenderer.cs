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
using Android.Webkit;
using Java.Interop;

[assembly: ExportRenderer(typeof(WebBrowser), typeof(WebBrowserRenderer))]
namespace PowerfulTrainer.Droid
{
    public class JSBridge : Java.Lang.Object
    {
        readonly WeakReference<WebBrowserRenderer> webBrowserRenderer;

        public JSBridge(WebBrowserRenderer hybridRenderer)
        {
            webBrowserRenderer = new WeakReference<WebBrowserRenderer>(hybridRenderer);
        }

        [JavascriptInterface]
        [Export("invokeAction")]
        public void InvokeAction(string data)
        {
            WebBrowserRenderer hybridRenderer;

            if (webBrowserRenderer != null && webBrowserRenderer.TryGetTarget(out hybridRenderer))
            {
                Device.BeginInvokeOnMainThread(() =>
                {
                    hybridRenderer.Element.JsNotify(data);
                });
            }
        }
    }

    public class WebBrowserRenderer : ViewRenderer<WebBrowser, Android.Webkit.WebView>
    {
        const string JavaScriptFunction = "function invokeCSharpAction(data){jsBridge.invokeAction(data);}";

        protected override void OnElementChanged(ElementChangedEventArgs<WebBrowser> e)
        {
            base.OnElementChanged(e);

            if (Control == null)
            {
                var webView = new Android.Webkit.WebView(Forms.Context);
                webView.Settings.JavaScriptEnabled = true;
                Element.OnBack += OnBack;
                Element.HandleUri += HandleUri;
                Element.HandleCanGoBack += HandleCanGoBack;
                SetNativeControl(webView);
            }
            if (e.OldElement != null)
            {
                Control.RemoveJavascriptInterface("jsBridge");
                var webBrowser = e.OldElement as WebBrowser;
                webBrowser.Cleanup();
            }
            if (e.NewElement != null)
            {
                Control.AddJavascriptInterface(new JSBridge(this), "jsBridge");
                Control.LoadUrl(Element.Uri);
                InjectJS(JavaScriptFunction);
            }
        }

        private object HandleUri(WebBrowser Sender)
        {
            Control.LoadUrl(Element.Uri);
            return true;
        }

        private object HandleCanGoBack(WebBrowser Sender)
        {
            return Control.CanGoBack();
        }

        private void OnBack(WebBrowser Sender)
        {
            Control.GoBack();
        }

        void InjectJS(string script)
        {
            if (Control != null)
            {
                Control.LoadUrl(string.Format("javascript: {0}", script));
            }
        }
    }
}