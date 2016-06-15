using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PowerfulTrainer.Web.Models.Api
{
    public class AddPlanReq
    {
        public string Name;
        public DateTime CreateDate;
        public string Username;
        public Object Data;
        public string Image;
    }

    public class UpdatePlanReq:AddPlanReq
    { }

    public class SharePlanReq
    {
        public int Id;
        public string Username;
    }
}