using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PowerfulTrainer
{
    public class EncourageAction:TrainingAction
    {
        public override void Execute()
        {
            PlaySoundAction PlaySound = new PlaySoundAction()
            {
                FileName = "Come_on.mp3"
            };
            PlaySound.Execute();
            BandManagement.SendNotification("Come on, close to being goal", Microsoft.Band.Portable.Notifications.VibrationType.RampUp);
        }
    }
}
