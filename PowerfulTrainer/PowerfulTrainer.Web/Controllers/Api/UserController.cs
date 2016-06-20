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
                    Username = CurrentAccount.Username,
                    MSAccessToken = CurrentAccount.MSAccessToken,
                    MSRefreshToken = CurrentAccount.MSRefreshToken,
                    MSExpireDate = CurrentAccount.MSExpireDate,
                });
            }
            catch (Exception ex)
            {
                return FailResult(ex);
            }
        }

        [HttpPut]
        [Route("api/msaccount")]
        public object UpdateMS([FromBody]UpdateMSAccountReq Req )
        {
            try
            {
                CurrentAccount = DB.Accounts.First(u => u.Username == CurrentAccount.Username);
                if (Req.MSAccessToken != null)
                {
                    CurrentAccount.MSAccessToken = Req.MSAccessToken;
                }
                if (Req.MSRefreshToken != null)
                {
                    CurrentAccount.MSRefreshToken = Req.MSRefreshToken;
                }
                if (Req.MSExpireDate != null)
                {
                    CurrentAccount.MSExpireDate = Req.MSExpireDate;
                }
                return SuccessResult(null);
            }
            catch(Exception ex)
            {
                return FailResult(ex);
            }
        }

        [HttpPut]
        [Route("api/account/")]
        public object Update([FromBody]UpdateAccountReq Req)
        {
            try
            {
                if (Req.CurrentPassword==null || AccountController.MD5(Req.CurrentPassword)!=CurrentAccount.Password)
                {
                    return ErrorResult(1, "Current password is incorrect");
                }
                CurrentAccount = DB.Accounts.First(u => u.Username == CurrentAccount.Username);
                if (Req.Name != null)
                {
                    CurrentAccount.Name = Req.Name;
                }
                if (Req.Password != null)
                {
                    CurrentAccount.Password = AccountController.MD5(Req.Password);
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
                return Validate();
            }
            catch(Exception ex)
            {
                return FailResult(ex);
            }
        }
    }
}
