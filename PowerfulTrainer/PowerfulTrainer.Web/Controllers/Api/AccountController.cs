using PowerfulTrainer.Web.Models;
using PowerfulTrainer.Web.Models.Api;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Cryptography;
using System.Text;
using System.Web.Http;

namespace PowerfulTrainer.Web.Controllers.Api
{
    public class AccountController : BaseApiController
    {
        [NonAction]
        public static string MD5(string password)
        {
            byte[] encodedPassword = new UTF8Encoding().GetBytes(password);
            byte[] hash = ((HashAlgorithm)CryptoConfig.CreateFromName("MD5")).ComputeHash(encodedPassword);
            return BitConverter.ToString(hash).Replace("-", string.Empty).ToLower();
        }

        [Route("api/account/register")]
        [HttpPost]
        public object Register([FromBody]RegisterReq Req)
        {
            try
            {
                if (Req.Username == null || Req.Password == null)
                {
                    return ErrorResult(2, "Username or Password is null");
                }
                var IsExist = DB.Accounts.Where(u => u.Username == Req.Username).Count() > 0;
                if (IsExist)
                {
                    return ErrorResult(1, "Username is duplicate");
                }
                Account NewAccount = new Account()
                {
                    Username = Req.Username,
                    Password = MD5(Req.Password),
                    Name = Req.Name,
                    Gender = Req.Gender,
                    Type = Req.Type,
                    AccessToken = Guid.NewGuid().ToString("N"),
                    ExpireDate = DateTime.Now.AddDays(60),
                    Birthday = Req.Birthday,
                    Avatar = Req.Avatar,
                    Phone = Req.Phone
                };
                DB.Accounts.InsertOnSubmit(NewAccount);
                DB.SubmitChanges();
                return SuccessResult(null);
            }
            catch (Exception ex)
            {
                return FailResult(ex);
            }
        }

        [Route("api/account/login")]
        [HttpPost]
        public object Login([FromBody]LoginReq Req)
        {
            try
            {
                var account = DB.Accounts.Where(u => u.Username == Req.Username && u.Password == MD5(Req.Password));
                if(account.Count()==0)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, "Username or password is invalid");
                }

                if (String.IsNullOrEmpty(account.First().AccessToken) || account.First().ExpireDate == null
                    || account.First().ExpireDate < DateTime.Now)
                {
                    account.First().AccessToken = Guid.NewGuid().ToString("N");
                    account.First().ExpireDate = DateTime.Now.AddDays(60);
                    DB.SubmitChanges();
                }

                return SuccessResult(new
                {
                    Name = account.First().Name,
                    Username = account.First().Username,
                    Gender = account.First().Gender,
                    Type = account.First().Type,
                    Birthday = account.First().Birthday,
                    AccessToken = account.First().AccessToken,
                    Avatar = account.First().Avatar,
                    ExpireDate = account.First().ExpireDate,
                    MSAccessToken = account.First().MSAccessToken,
                    MSExpireDate = account.First().MSExpireDate,
                    QR = "https://zxing.org/w/chart?cht=qr&chs=350x350&chld=L&choe=UTF-8&chl=" + account.First().Username
                });
            }
            catch (Exception ex)
            {
                return FailResult(ex);
            }
        }

        [Route("api/msaccount/auth")]
        [HttpGet]
        public object AuthMSHealth(string redirectUrl)
        {
            String authorizeUrl = MSAuthorizeUrl.Replace("{client_id}", ClientId)
                .Replace("{scope}", Scope)
                .Replace("{redirect_uri}", redirectUrl);

            var response = Request.CreateResponse(HttpStatusCode.Moved);
            response.Headers.Location = new Uri(authorizeUrl);
            return response;
        }

        [Route("api/exercise/{Id}")]
        [HttpGet]
        public object GetExerciseById(int Id)
        {
            try
            {
                var Ex = DB.Exercises.First(u => u.Id == Id);
                return SuccessResult(Ex);
            }
            catch (Exception ex)
            {
                return FailResult(ex);
            }
        }

        [Route("api/exercise/image/{Id}")]
        [HttpGet]
        public object GetFullImage(int Id)
        {
            try
            {
                var Image = DB.Exercises.First(u => u.Id == Id).Image;

                HttpResponseMessage Result = new HttpResponseMessage(HttpStatusCode.OK);
                Result.Content = new ByteArrayContent(Convert.FromBase64String(Image));
                Result.Content.Headers.ContentType = new MediaTypeHeaderValue("image/jpeg");
                return Result;
            }
            catch (Exception ex)
            {
                return FailResult(ex);
            }
        }
        

        [Route("api/event")]
        [HttpGet]
        public object GetPlanEvent()
        {
            try
            {
                var Path = System.Web.HttpContext.Current.Server.MapPath(@"~/App_Data/Event.json");
                var Text = File.ReadAllText(Path);
                return SuccessResult(Text);
            }
            catch (Exception ex)
            {
                return FailResult(ex);
            }
        }

    }
}
