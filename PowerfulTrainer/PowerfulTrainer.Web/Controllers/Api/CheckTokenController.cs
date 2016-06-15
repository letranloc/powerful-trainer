using PowerfulTrainer.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Filters;
using System.Web.Http.Controllers;

namespace PowerfulTrainer.Web.Controllers.Api
{
    public class CheckTokenController : BaseApiController
    {
        public Account CurrentAccount = null;

        protected override void Initialize(HttpControllerContext controllerContext)
        {
            base.Initialize(controllerContext);
            var Header = controllerContext.Request.Headers;
            if (Header.Contains("Authorization"))
            {
                var Token = Header.GetValues("Authorization").First();
                using (DataEntityDataContext DB = new DataEntityDataContext())
                {
                    var account = DB.Accounts.Where(u => u.AccessToken == Token).ToList();
                    if (account.Count > 0)
                    {
                        if (account.First().ExpireDate < DateTime.Now)
                        {
                            CreateResponseException (HttpStatusCode.Unauthorized, "Token is expire");
                        }
                        CurrentAccount = account.First();
                    }
                    else
                    {
                        CreateResponseException (HttpStatusCode.Unauthorized,"Token is invalid");
                    }
                }
            }
            else
            {
                CreateResponseException (HttpStatusCode.Unauthorized,"Access denied");
            }
            
        }
    }
}
