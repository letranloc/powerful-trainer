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
    }
}
