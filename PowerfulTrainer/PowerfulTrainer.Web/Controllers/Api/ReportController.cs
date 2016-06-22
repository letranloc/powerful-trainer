using PowerfulTrainer.Web.Models;
using PowerfulTrainer.Web.Models.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PowerfulTrainer.Web.Controllers.Api
{
    public class ReportController : CheckTokenController
    {
        [HttpGet]
        [Route("api/report/username")]
        public object Get(string Username, DateTime? FromTime=null, DateTime? ToTime=null)
        {
            try
            {
                if(DB.Accounts.Count(u=>u.Username==Username)==0)
                {
                    return ErrorResult(1, "Username is not exist");
                }
                var CountFriend1 = DB.Friends.Count(u => u.Username == CurrentAccount.Username && u.FriendUser == Username && u.IsWaiting == 0);
                var CountFriend2 = DB.Friends.Count(u => u.FriendUser == CurrentAccount.Username && u.Username == Username && u.IsWaiting == 0);
                if (CountFriend1 + CountFriend2 == 0)
                {
                    return ErrorResult(2, "User is not friend");
                }

                return SuccessResult(GetReport(Username, FromTime, ToTime));
            }
            catch(Exception ex)
            {
                return FailResult(ex);
            }
        }

        [HttpGet]
        [Route("api/report")]
        public object Get(DateTime? FromTime = null, DateTime? ToTime = null)
        {
            try
            {
                return SuccessResult(GetReport(CurrentAccount.Username, FromTime, ToTime));
            }
            catch (Exception ex)
            {
                return FailResult(ex);
            }
        }

        [NonAction]
        private object GetReport(string Username, DateTime? FromTime = null, DateTime? ToTime = null)
        {
            var Result = DB.Reports.Where(u => u.Username == Username);
            if(FromTime!=null)
            {
                Result = Result.Where(u => u.BeginTime > FromTime);
            }
            if (ToTime != null)
            {
                Result = Result.Where(u => u.BeginTime < ToTime);
            }
            return Result.ToArray();
        }

        [HttpPost]
        [Route("api/report")]
        public object Add(AddReportReq Req)
        {
            try
            {
                var Plans = DB.WorkoutPlans.Where(u => u.Id == Req.PlanID && u.Username == CurrentAccount.Username);
                if(Plans.Count()==0)
                {
                    return ErrorResult(1, "PlanID is invalid");
                }
                var Plan = Plans.First();

                bool GoalHeartRate = Plan.AvgHeartRate != null && Plan.AvgHeartRate > Req.AvgHeartRate ? false : true;
                bool GoalCals = Plan.TotalCals != null && Plan.TotalCals > Req.TotalCals ? false : true;
                bool GoalStep = Plan.TotalSteps != null && Plan.TotalSteps > Req.TotalSteps ? false : true;

                DB.Reports.InsertOnSubmit(new Report()
                {
                    PlanID = Plan.Id,
                    PlanName = Plan.Name,
                    Username = CurrentAccount.Username,
                    BeginTime = Req.BeginTime,
                    Duration = Req.Duration,
                    AvgHeartRate = Req.AvgHeartRate,
                    TotalCals = Req.TotalCals,
                    TotalSteps = Req.TotalSteps,
                    IsGoal = GoalHeartRate && GoalCals && GoalStep
                });
                DB.SubmitChanges();
                return SuccessResult(null);

            }
            catch(Exception ex)
            {
                return FailResult(ex);
            }
        }
    }
}
