using PowerfulTrainer.Web.Models;
using System;
using System.Collections.Generic;
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
            return new
            {
                ReturnCode = 0,
                Message = "Success",
                Data = Data
            };
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
    }
}
