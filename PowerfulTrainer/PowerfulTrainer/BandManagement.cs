using Microsoft.Band.Portable;
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

        public static double? BeginCalories;
        public static double? BeginDistance;
        public static double? BeginStep;

        public static double? LastCalories;
        public static double? LastDistance;
        public static double? LastStep;

        public static async void Update()
        {
            var BandClientManager = Microsoft.Band.Portable.BandClientManager.Instance;
            var pairedBands = await BandClientManager.GetPairedBandsAsync();
            try
            {
                BandClient bandClient = await BandClientManager.ConnectAsync(pairedBands.First());
                {
                    await RequestConsent(bandClient);
                    await GetSensorValue(bandClient);
                }

            }
            catch (Exception ex)
            {
            }
        }

        public static void Reset()
        {
            BeginCalories = null;
            BeginStep = null;
            BeginDistance = null;
        }

        private static async Task GetSensorValue(BandClient bandClient)
        {
            bandClient.SensorManager.HeartRate.ReadingChanged += (sender, args) =>
            {
                HeartRate = args.SensorReading;
            };
            bandClient.SensorManager.Accelerometer.ReadingChanged += (sender, args) =>
            {
                Accelerometer = args.SensorReading;
            };
            bandClient.SensorManager.Calories.ReadingChanged += (sender, args) =>
            {
                LastCalories = GetValue(BandSensorType.Calories);
                Calories = args.SensorReading;
                if (BeginCalories == null)
                {
                    BeginCalories = Calories.Calories;
                }
            };
            bandClient.SensorManager.Pedometer.ReadingChanged += (sender, args) =>
            {
                LastStep = GetValue(BandSensorType.Step);
                Pedometer = args.SensorReading;
                if (BeginStep == null)
                {
                    BeginStep = Pedometer.TotalSteps;
                }
            };
            bandClient.SensorManager.Distance.ReadingChanged += (sender, args) =>
            {
                LastDistance = GetValue(BandSensorType.Distance);
                Distance = args.SensorReading;
                if (BeginDistance == null)
                {
                    BeginDistance = Distance.TotalDistance;
                }
            };

            await bandClient.SensorManager.HeartRate.StartReadingsAsync();
            await bandClient.SensorManager.Pedometer.StartReadingsAsync();
            await bandClient.SensorManager.Calories.StartReadingsAsync();
            await bandClient.SensorManager.Accelerometer.StartReadingsAsync();
            await bandClient.SensorManager.Distance.StartReadingsAsync();
        }

        private static async Task RequestConsent(BandClient bandClient)
        {
            if (bandClient.SensorManager.HeartRate.UserConsented != UserConsent.Granted)
            {
                await bandClient.SensorManager.HeartRate.RequestUserConsent();
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
                    return false;
                case BandSensorType.AccelerometerX:
                    return false;
                case BandSensorType.AccelerometerY:
                    return false;
                case BandSensorType.AccelerometerZ:
                    return false;
                case BandSensorType.Calories:
                    return true;
                case BandSensorType.Step:
                    return true;
                case BandSensorType.Distance:
                    return true;
                case BandSensorType.Speed:
                    return false;
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
