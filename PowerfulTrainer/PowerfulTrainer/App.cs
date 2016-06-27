using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Xamarin.Forms;

namespace PowerfulTrainer
{
    public class App : Application
    {
        public App()
        {
            // The root page of your application
            var RootPage = new NavigationPage(new MainPage());
            MainPage = RootPage;
            
        }

        protected override void OnStart()
        {
           // AppManagement.Run();
        }

        protected override void OnSleep()
        {
            // Handle when your app sleeps
        }

        protected override void OnResume()
        {
            // Handle when your app resumes
        }
    }
}
