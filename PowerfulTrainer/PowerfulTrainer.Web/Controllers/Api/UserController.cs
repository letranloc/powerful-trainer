using PowerfulTrainer.Web.Models.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PowerfulTrainer.Web.Controllers.Api
{
    public class UserController : CheckTokenController
    {     
        [HttpGet]
        public object Validate()
        {
            try
            {
                return SuccessResult(new
                {
                    Name = CurrentAccount.Name,
                    Gender = CurrentAccount.Gender,
                    Type = CurrentAccount.Type,
                    Birthday = CurrentAccount.Birthday,
                    Avatar = CurrentAccount.Avatar,
                    AccessToken = CurrentAccount.AccessToken,
                    ExpireDate = CurrentAccount.ExpireDate,
                    Username = CurrentAccount.Username
                });
            }
            catch (Exception ex)
            {
                return FailResult(ex);
            }
        }

        [HttpPut]
        [Route("api/account/")]
        public object Update(UpdateAccountReq Req)
        {
            try
            {
                if(Req.CurrentPassword==null || AccountController.MD5(Req.CurrentPassword)!=CurrentAccount.Password)
                {
                    return ErrorResult(1, "Current password is incorrect");
                }
                if (Req.Name != null)
                {
                    CurrentAccount.Name = Req.Name;
                }
                if (Req.Password != null)
                {
                    CurrentAccount.Password = Req.Password;
                }
                if (Req.Type != null)
                {
                    CurrentAccount.Type = Req.Type;
                }
                if (Req.Gender != null)
                {
                    CurrentAccount.Gender = Req.Gender;
                }
                if (Req.Birthday != null)
                {
                    CurrentAccount.Birthday = Req.Birthday;
                }
                if (Req.Avatar != null)
                {
                    CurrentAccount.Avatar = Req.Avatar;
                }
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
