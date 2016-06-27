using Newtonsoft.Json.Linq;
using PowerfulTrainer.Web.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Filters;
using System.Web.Http.Results;

namespace PowerfulTrainer.Web.Controllers.Api
{
    public class BaseApiController : ApiController
    {

        protected String MSAuthorizeUrl = "https://login.live.com/oauth20_authorize.srf?client_id={client_id}&scope={scope}&response_type=code&redirect_uri={redirect_uri}";
        protected String MSTokenUrl = "https://login.live.com/oauth20_token.srf?client_id={client_id}&redirect_uri={redirect_uri}&client_secret={client_secret}&grant_type={grant_type}";
        protected String MSLogoutUrl = "https://login.live.com/oauth20_logout.srf?client_id={client_id}&redirect_uri={redirect_uri}";
        protected String MSApiUrl = "https://api.microsofthealth.net/v1/me";

        protected String ClientId = "000000004819E73A";
        protected String ClientSecret = "AHidfgqquy8Ma56joH19YUu";
        protected String Scope = "offline_access,mshealth.ReadProfile,mshealth.ReadDevices,mshealth.ReadActivityHistory,mshealth.ReadActivityLocation";

        protected DataEntityDataContext DB = new DataEntityDataContext();
        protected object PagingResult(IEnumerable<object>Result, int? page, int? size)
        {
            int TotalPage = 1;
            int Count = Result.Count();
            if (size != null && page != null)
            {
                TotalPage = Result.Count() / size.Value + (Result.Count() % size.Value > 0 ? 1 : 0);
                Result = Result.Skip((page.Value - 1) * size.Value).Take(size.Value).ToList();
            }
            return SuccessResult(new
            {
                Result = Result,
                Count = Count,
                TotalPage = TotalPage
            });
        }
        protected object SuccessResult(object Data)
        {
            return Ok(new
            {
                ReturnCode = 0,
                Message = "Success",
                Data = Data
            });
        }
        protected object FailResult(Exception ex)
        {
            return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
        }

        protected void CreateResponseException(HttpStatusCode Code, String Message="")
        {
            throw new HttpResponseException(Request.CreateErrorResponse(Code, Message));
        }

        protected object ErrorResult(int ErrorCode, string Message)
        {
            return new
            {
                ReturnCode = ErrorCode,
                Message = Message
            };
        }
        
        public object WRequest(string URL, string method, string postData)
        {
            string responseData = "";
            try
            {
                CookieContainer cookieJar = new CookieContainer();
                HttpWebRequest hwrequest = (HttpWebRequest) WebRequest.Create(URL);
                hwrequest.CookieContainer = cookieJar;
                hwrequest.Accept = "*/*";
                hwrequest.AllowAutoRedirect = true;
                hwrequest.UserAgent = "http_requester/0.1";
                hwrequest.Timeout = 60000;
                hwrequest.Method = method;
                if (hwrequest.Method == "POST")
                {
                    hwrequest.ContentType = "application/x-www-form-urlencoded";
                    // Use UTF8Encoding instead of ASCIIEncoding for XML requests:
                    System.Text.ASCIIEncoding encoding = new System.Text.ASCIIEncoding();
                    byte[] postByteArray = encoding.GetBytes(postData);
                    hwrequest.ContentLength = postByteArray.Length;
                    Stream postStream = hwrequest.GetRequestStream();
                    postStream.Write(postByteArray, 0, postByteArray.Length);
                    postStream.Close();
                }
                HttpWebResponse hwresponse = (HttpWebResponse)hwrequest.GetResponse();
                if (hwresponse.StatusCode == HttpStatusCode.OK)
                {
                    Stream responseStream = hwresponse.GetResponseStream();
                    StreamReader myStreamReader = new StreamReader(responseStream);
                    responseData = myStreamReader.ReadToEnd();
                }
                hwresponse.Close();
            }
            catch (WebException ex)
            {
                return FailResult(ex);
            }
            return JObject.Parse(responseData);
        }
    }
}
