using PowerfulTrainer.Shared.TrainingModels.TrainingActions;
using PowerfulTrainer.UWP.Models.TrainingActions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Windows.Storage;
using Windows.UI.Xaml.Controls;

[assembly: Xamarin.Forms.Dependency(typeof(PlaySoundActionImplement))]
namespace PowerfulTrainer.UWP.Models.TrainingActions
{
    public class PlaySoundActionImplement: PlaySoundAction
    {
        public async override void Execute()
        {
            StorageFolder Folder = Windows.ApplicationModel.Package.Current.InstalledLocation;
            Folder = await Folder.GetFolderAsync("Assets");
            StorageFile sf = await Folder.GetFileAsync(FileName);

            MediaElement Player = new MediaElement();
            Player.SetSource(await sf.OpenReadAsync(), sf.ContentType);
            Player.Play();
        }
    }
}
