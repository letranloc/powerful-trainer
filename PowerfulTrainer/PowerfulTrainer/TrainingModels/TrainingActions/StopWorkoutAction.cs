using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PowerfulTrainer
{
    public class StopWorkoutAction:TrainingAction
    {
        public override void Execute()
        {
            PlaySoundAction PlaySound = new PlaySoundAction()
            {
                FileName = "Danger.mp3"
            };
            PlaySound.Execute();
            BandManagement.SendNotification("Stop now! Stop now!", Microsoft.Band.Portable.Notifications.VibrationType.NotificationAlarm);
        }
    }
}
