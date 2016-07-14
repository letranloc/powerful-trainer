using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PowerfulTrainer.Web.Models.Api
{
    public class AddPlanReq
    {
        public string Name;
        public Object Data;
        public string Image;
        public float? AvgHeartRate;
        public float? TotalCals;
        public float? TotalSteps;
    }

    public class UpdatePlanReq:AddPlanReq
    { }

    public class SharePlanReq
    {
        public int Id;
        public string Username;
    }
    public class SharePlanQrReq
    {
        public int Id;
        public string Key;
    }
}