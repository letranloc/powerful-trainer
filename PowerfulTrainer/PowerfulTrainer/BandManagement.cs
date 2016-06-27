using Microsoft.Band.Portable;
using Microsoft.Band.Portable.Notifications;
using Microsoft.Band.Portable.Sensors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace PowerfulTrainer
{
    public enum BandSensorType
    {
        AccelerometerX,
        AccelerometerY,
        AccelerometerZ,
        HeartRate,
        InstantHeartRate,
        Calories,
        Step,
        Distance,
        Speed
    }

    public class BandManagement
    {
        public static BandHeartRateReading HeartRate;
        public static BandAccelerometerReading Accelerometer;
        public static BandCaloriesReading Calories;
        public static BandPedometerReading Pedometer;
        public static BandDistanceReading Distance;

        public static BandClient BandClient;

        public static double? BeginCalories;
        public static double? BeginDistance;
        public static double? BeginStep;
        public static List<int> ListHeartRate = new List<int>();

        public static double? LastCalories;
        public static double? LastDistance;
        public static double? LastStep;

        public static Guid tileGuid = new Guid(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);

        public static async void SendNotification(string Msg, VibrationType VibrationType)
        {
            await BandClient.NotificationManager.VibrateAsync(VibrationType);
            await BandClient.NotificationManager.ShowDialogAsync(tileGuid, "PowerfulTrainer", Msg);
        }

        public static async Task Init()
        {
            var BandClientManager = Microsoft.Band.Portable.BandClientManager.Instance;
            var pairedBands = await BandClientManager.GetPairedBandsAsync();
            try
            {
                BandClient = await BandClientManager.ConnectAsync(pairedBands.First());
                {
                    await RequestConsent();
                    GetSensorValue();
                }

            }
            catch (Exception ex)
            {
            }
        }

        public static async Task Start()
        {
            BeginCalories = null;
            BeginStep = null;
            BeginDistance = null;
            ListHeartRate.Clear();

            await BandClient.SensorManager.HeartRate.StartReadingsAsync();
            await BandClient.SensorManager.Pedometer.StartReadingsAsync();
            await BandClient.SensorManager.Calories.StartReadingsAsync();
            await BandClient.SensorManager.Accelerometer.StartReadingsAsync();
            await BandClient.SensorManager.Distance.StartReadingsAsync();
            await BandClient.TileManager.StartEventListenersAsync();
        }

        public static async void Stop()
        {
            await BandClient.SensorManager.HeartRate.StopReadingsAsync();
            await BandClient.SensorManager.Pedometer.StopReadingsAsync();
            await BandClient.SensorManager.Calories.StopReadingsAsync();
            await BandClient.SensorManager.Accelerometer.StopReadingsAsync();
            await BandClient.SensorManager.Distance.StopReadingsAsync();
            await BandClient.TileManager.StopEventListenersAsync();
        }

        private static void GetSensorValue()
        {
            BandClient.SensorManager.HeartRate.ReadingChanged += (sender, args) =>
            {
                if (args.SensorReading.Quality == HeartRateQuality.Locked)
                {
                    HeartRate = args.SensorReading;
                    ListHeartRate.Add(HeartRate.HeartRate);
                }
            };
            BandClient.SensorManager.Accelerometer.ReadingChanged += (sender, args) =>
            {
                Accelerometer = args.SensorReading;
            };
            BandClient.SensorManager.Calories.ReadingChanged += (sender, args) =>
            {
                //LastCalories = GetValue(BandSensorType.Calories);
                Calories = args.SensorReading;
                if (BeginCalories == null)
                {
                    BeginCalories = Calories.Calories;
                }
            };
            BandClient.SensorManager.Pedometer.ReadingChanged += (sender, args) =>
            {
               // LastStep = GetValue(BandSensorType.Step);
                Pedometer = args.SensorReading;
                if (BeginStep == null)
                {
                    BeginStep = Pedometer.TotalSteps;
                }
            };
            BandClient.SensorManager.Distance.ReadingChanged += (sender, args) =>
            {
               // LastDistance = GetValue(BandSensorType.Distance);
                Distance = args.SensorReading;
                if (BeginDistance == null)
                {
                    BeginDistance = Distance.TotalDistance;
                }
            };
        }

        private static async Task RequestConsent()
        {
            if (BandClient.SensorManager.HeartRate.UserConsented != UserConsent.Granted)
            {
                await BandClient.SensorManager.HeartRate.RequestUserConsent();
            }
        }

        public static string GetUnit(BandSensorType sensorType)
        {
            switch (sensorType)
            {
                case BandSensorType.AccelerometerX:
                case BandSensorType.AccelerometerY:
                case BandSensorType.AccelerometerZ:
                    return "g";
                case BandSensorType.HeartRate:
                    return "b/m";
                case BandSensorType.Calories:
                    return "cals";
                case BandSensorType.Step:
                    return "steps";
                case BandSensorType.Distance:
                    return "cm";
                case BandSensorType.Speed:
                    return "cm/s";
                default:
                    return "";
            }
        }

        public static bool IsConsecutiveValue(BandSensorType sensorType)
        {
            switch (sensorType)
            {
                case BandSensorType.HeartRate:
                case BandSensorType.AccelerometerX:
                case BandSensorType.InstantHeartRate:
                case BandSensorType.AccelerometerY:
                case BandSensorType.AccelerometerZ:
                case BandSensorType.Speed:
                    return false;
                case BandSensorType.Calories:
                case BandSensorType.Step:
                case BandSensorType.Distance:
                    return true;               
            }
            return false;
        }

        public static double GetValue(BandSensorType sensorType)
        {
            try
            {
                switch (sensorType)
                {
                    case BandSensorType.HeartRate:
                        return ListHeartRate.Average();
                    case BandSensorType.InstantHeartRate:
                        return HeartRate.HeartRate;
                    case BandSensorType.AccelerometerX:
                        return Accelerometer.AccelerationX;
                    case BandSensorType.AccelerometerY:
                        return Accelerometer.AccelerationY;
                    case BandSensorType.AccelerometerZ:
                        return Accelerometer.AccelerationZ;
                    case BandSensorType.Calories:
                        return BeginCalories.HasValue ? Calories.Calories - BeginCalories.Value : 0;
                    case BandSensorType.Step:
                        return BeginStep.HasValue ? Pedometer.TotalSteps - BeginStep.Value : 0;
                    case BandSensorType.Distance:
                        return BeginDistance.HasValue ? Distance.TotalDistance - BeginDistance.Value : 0;
                    case BandSensorType.Speed:
                        return Distance.Speed;
                }
                return -1111;
            }
            catch
            {
                return 0;
            }
        }
    }
}
