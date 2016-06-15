using Newtonsoft.Json;
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
    public class PlanController : CheckTokenController
    {
        [Route("api/plans")]
        [HttpPost]
        public object Add([FromBody]AddPlanReq Req)
        {
            try
            {
                string PlanData = JsonConvert.SerializeObject(Req.Data);
                DB.WorkoutPlans.InsertOnSubmit(new WorkoutPlan
                {
                    Name = Req.Name,
                    Username = CurrentAccount.Username,
                    Data = PlanData,
                    Image = Req.Image,
                    CreateDate = DateTime.Now,
                    UpdateDate = DateTime.Now
                });
                DB.SubmitChanges();
                return SuccessResult(null);
            }
            catch (Exception ex)
            {
                return FailResult(ex);
            }
        }


        [Route("api/plans/{id}")]
        [HttpGet]
        public object Get(int id)
        {
            try
            {
                var Plan = DB.WorkoutPlans.Where(u => u.Id == id && u.Username == CurrentAccount.Username);
                if (Plan.Count() == 0)
                {
                    return ErrorResult(1, "PlanID is not exists");
                }
                var CurrentPlan = Plan.First();
                var OwnerName = "";
                var OwnerUsername = "";
                if (CurrentPlan.ParentPlan == null)
                {
                    OwnerName = CurrentAccount.Name;
                    OwnerUsername = CurrentAccount.Username;
                }
                else
                {
                    var ParentAccount = DB.Accounts.First(u => u.Username == CurrentPlan.Owner);
                    OwnerName = ParentAccount.Name;
                    OwnerUsername = ParentAccount.Username;
                }

                return SuccessResult(new
                {
                    Id = CurrentPlan.Id,
                    Data = JsonConvert.DeserializeObject(CurrentPlan.Data),
                    Image = CurrentPlan.Image,
                    CreateDate = CurrentPlan.CreateDate,
                    UpdateDate = CurrentPlan.UpdateDate,
                    Name = CurrentPlan.Name,
                    OwnerName = OwnerName,
                    OwnerUsername = OwnerUsername
                });
            }
            catch (Exception ex)
            {
                return FailResult(ex);
            }
        }

        [Route("api/plans")]
        [HttpGet]
        public object GetAll(int? page = null, int? size = null)
        {
            try
            {
                var Plans = new List<object>();
                DB.WorkoutPlans.Where(u => u.Username == CurrentAccount.Username).ToList().ForEach(CurrentPlan =>
                {
                    var OwnerName = "";
                    var OwnerUsername = "";
                    if (CurrentPlan.ParentPlan == null)
                    {
                        OwnerName = CurrentAccount.Name;
                        OwnerUsername = CurrentAccount.Username;
                    }
                    else
                    {
                        var ParentAccount = DB.Accounts.First(u => u.Username == CurrentPlan.Owner);
                        OwnerName = ParentAccount.Name;
                        OwnerUsername = ParentAccount.Username;
                    }

                    Plans.Add(new
                    {
                        Id = CurrentPlan.Id,
                        Image = CurrentPlan.Image,
                        CreateDate = CurrentPlan.CreateDate,
                        UpdateDate = CurrentPlan.UpdateDate,
                        Name = CurrentPlan.Name,
                        OwnerName = OwnerName,
                        OwnerUsername = OwnerUsername
                    });
                });
                return PagingResult(Plans, page, size);
            }
            catch (Exception ex)
            {
                return FailResult(ex);
            }
        }

        [Route("api/plans/{id}")]
        [HttpDelete]
        public object Delete(int id)
        {
            try
            {
                var Plan = DB.WorkoutPlans.Where(u => u.Id == id && u.Username == CurrentAccount.Username);
                if (Plan.Count() == 0)
                {
                    return ErrorResult(1, "PlanID is not exists");
                }
                DB.WorkoutPlans.DeleteOnSubmit(Plan.First());
                DB.SubmitChanges();
                return SuccessResult(null);
            }
            catch (Exception ex)
            {
                return FailResult(ex);
            }
        }

        [Route("api/plans/{id}")]
        [HttpPut]
        public object Update(int id, [FromBody]UpdatePlanReq Req)
        {
            try
            {
                var Plan = DB.WorkoutPlans.Where(u => u.Id == id && u.Username == CurrentAccount.Username);
                if (Plan.Count() == 0)
                {
                    return ErrorResult(1, "PlanID is not exists");
                }
                if (Req.Name != null)
                {
                    Plan.First().Name = Req.Name;
                }
                if (Req.Data != null)
                {
                    Plan.First().Data = JsonConvert.SerializeObject(Req.Data);
                }
                if (Req.Image != null)
                {
                    Plan.First().Image = Req.Image;
                }
                Plan.First().UpdateDate = DateTime.Now;
                DB.SubmitChanges();
                return SuccessResult(null);
            }
            catch (Exception ex)
            {
                return FailResult(ex);
            }
        }


        [Route("api/plans/share")]
        [HttpPost]
        public object Share([FromBody]SharePlanReq Req)
        {
            try
            {
                if (DB.Accounts.Count(u => u.Username == Req.Username) == 0)
                {
                    return ErrorResult(1, "Username is not exists");
                }
                if (DB.WorkoutPlans.Count(u => u.Username == CurrentAccount.Username && u.Id == Req.Id) == 0)
                {
                    return ErrorResult(2, "PlandID is not exists");
                }
                var CountFriend1 = DB.Friends.Count(u => u.Username == CurrentAccount.Username && u.FriendUser == Req.Username && u.IsWaiting == 0);
                var CountFriend2 = DB.Friends.Count(u => u.FriendUser == CurrentAccount.Username && u.Username == Req.Username && u.IsWaiting == 0);
                if(CountFriend1+CountFriend2==0)
                {
                    return ErrorResult(3, "User is not friend");
                }

                var ParentPlan = DB.WorkoutPlans.Where(u => u.Id == Req.Id).First();
                DB.WorkoutPlans.InsertOnSubmit(new Models.WorkoutPlan()
                {
                    Name = ParentPlan.Name,
                    Username = Req.Username,
                    ParentPlan = ParentPlan.Id,
                    Data = ParentPlan.Data,
                    Image = ParentPlan.Image,
                    CreateDate = ParentPlan.CreateDate,
                    UpdateDate = DateTime.Now,
                    ShareTime = DateTime.Now,
                    Owner = ParentPlan.Username
                });
                DB.SubmitChanges();
                return SuccessResult(null);
            }
            catch (Exception ex)
            {
                return FailResult(ex);
            }
        }

        [Route("api/plans/sharenotify/{milisecond}")]
        [HttpGet]
        public object ShareNotify(int milisecond)
        {
            try
            {
                var FromTime = DateTime.Now.AddMilliseconds(-milisecond);
                var AllShare = DB.WorkoutPlans.Where(u => u.Username == CurrentAccount.Username && u.ParentPlan != null && u.ShareTime > FromTime);
                var Result = new List<object>();
                foreach(var Plan in AllShare)
                {
                    var ParentUser = DB.Accounts.Where(u => u.Username == Plan.Owner).First();
                    Result.Add(new
                    {
                        PlanName = Plan.Name,
                        Username = ParentUser.Username,
                        Name = ParentUser.Name
                    });
                }
                return SuccessResult(Result);
            }
            catch (Exception ex)
            {
                return FailResult(ex);
            }
        }
    }
}
