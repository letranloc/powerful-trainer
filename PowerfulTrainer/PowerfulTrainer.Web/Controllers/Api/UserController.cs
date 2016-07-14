using Newtonsoft.Json.Linq;
using PowerfulTrainer.Web.Models;
using PowerfulTrainer.Web.Models.Api;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace PowerfulTrainer.Web.Controllers.Api
{
    public class UserController : CheckTokenController
    {     
        [HttpGet]
        [Route("api/msaccount")]
        public object CallMSToken()
        {
            try
            {
                HttpClient Client = new HttpClient();
                var Response = Client.GetStringAsync("https://login.live.com/oauth20_token.srf?client_id=000000004819E73A&client_secret=AHidfgqquy8Ma56joH19YUu&code=M7a9d75e5-a53f-536d-ab5c-f86a58bfd686&grant_type=authorization_code&redirect_uri=http%3A%2F%2Flocalhost%3A62466%2Fauth%2Fmshealth%2Fcallback").Result;
                return SuccessResult(Response);
            }
            catch(Exception ex)
            {
                return FailResult(ex);
            }
        }

        [HttpGet]
        public object Validate()
        {
            try
            {
                SimpleAES AES = new SimpleAES();
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
                    MSExpireDate = CurrentAccount.MSExpireDate,
                    Phone = CurrentAccount.Phone,
                    QR = "https://zxing.org/w/chart?cht=qr&chs=350x350&chld=L&choe=UTF-8&chl="+ AES.EncryptToString(CurrentAccount.Username)
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
                    if (Req.MSAccessToken == "")
                    {
                        CurrentAccount.MSRefreshToken = null;
                        CurrentAccount.MSAccessToken = null;
                    }
                    else CurrentAccount.MSAccessToken = Req.MSAccessToken;
                }
                if (Req.MSRefreshToken != null)
                {
                    CurrentAccount.MSRefreshToken = Req.MSRefreshToken;
                }
                if (Req.MSExpireDate != null)
                {
                    CurrentAccount.MSExpireDate = Req.MSExpireDate;
                }
                DB.SubmitChanges();
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
                if(Req.Phone!=null)
                {
                    CurrentAccount.Phone = Req.Phone;
                }
                DB.SubmitChanges();
                return Validate();
            }
            catch(Exception ex)
            {
                return FailResult(ex);
            }
        }

        [Route("api/msaccount/validate")]
        [HttpGet]
        public object ValidateMSHealth(string code = null)
        {
            String tokenUrl = MSTokenUrl.Replace("{client_id}", ClientId)
                .Replace("{client_secret}", ClientSecret)
                .Replace("{scope}", Scope)
                .Replace("{redirect_uri}", HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Host + ":" + HttpContext.Current.Request.Url.Port + "/auth/mshealth/callback");
            object response = null;

            if (String.IsNullOrWhiteSpace(code))
            {
                if (!String.IsNullOrWhiteSpace(CurrentAccount.MSRefreshToken))
                {
                    tokenUrl = tokenUrl.Replace("{grant_type}", "refresh_token") + "&refresh_token=" + CurrentAccount.MSRefreshToken;
                    response = WRequest(tokenUrl, "GET", "");
                }
            } else
            {
                tokenUrl = tokenUrl.Replace("{grant_type}", "authorization_code") + " &code=" + code;
                response = WRequest(tokenUrl, "GET", "");
            }

            if (response != null)
            {
                if (response is JObject)
                {
                    JObject json = (JObject)response;
                    CurrentAccount = DB.Accounts.First(u => u.Username == CurrentAccount.Username);
                    CurrentAccount.MSAccessToken = json.Value<string>("access_token");
                    CurrentAccount.MSRefreshToken = json.Value<string>("refresh_token");
                    CurrentAccount.MSExpireDate = DateTime.Now.AddSeconds(json.Value<int>("expires_in"));
                    DB.SubmitChanges();
                    return Validate();
                }
                else return response;
            }

            return ErrorResult(1, "Invalid request");
        }
    }
}
