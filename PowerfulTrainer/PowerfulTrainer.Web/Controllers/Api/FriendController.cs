using PowerfulTrainer.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PowerfulTrainer.Web.Controllers.Api
{
    public class FriendController : CheckTokenController
    {
        [Route("api/friends")]
        [HttpGet]
        public object Get(int? page = null, int? size = null)
        {
            try
            {
                var Friends1 = DB.Friends.Where(u => (u.Username == CurrentAccount.Username && u.IsWaiting == 0)).Select(u => u.FriendUser);
                var Friends2 = DB.Friends.Where(u => (u.FriendUser == CurrentAccount.Username && u.IsWaiting == 0)).Select(u => u.Username);
                var Friends = Friends1.Union(Friends2).ToList();
                Friends.Remove(CurrentAccount.Username);
                var Result = new List<object>();
                foreach (var Friend in Friends)
                {
                    var FriendDetail = DB.Accounts.Where(u => u.Username == Friend).First();
                    Result.Add(new
                    {
                        Username = FriendDetail.Username,
                        Name = FriendDetail.Name,
                        Avatar = FriendDetail.Avatar,
                        Type = FriendDetail.Type,
                        Phone = FriendDetail.Phone
                    });
                }
                return PagingResult(Result, page, size);
            }
            catch (Exception ex)
            {
                return FailResult(ex);
            }
        }



        [Route("api/friends/search/{query}")]
        [HttpGet]
        public object Search(string query, int? page = null, int? size = null)
        {
            try
            {
                var SearchResult = DB.Accounts.Where(u => u.Username != CurrentAccount.Username && (u.Username + (u.Name != null ? u.Name : "")).ToLower().Contains(query.ToLower()));
                var Result = new List<Models.Api.FriendSearchRes>();
                foreach (var User in SearchResult)
                {
                    var Friend1 = DB.Friends.Where(v => (v.Username == CurrentAccount.Username) && (v.FriendUser == User.Username));
                    var Friend2 = DB.Friends.Where(v => (v.FriendUser == CurrentAccount.Username) && (v.Username == User.Username));
                    Result.Add(new Models.Api.FriendSearchRes()
                    {
                        Username = User.Username,
                        Name = User.Name,
                        Avatar = User.Avatar,
                        Type = User.Type,
                        IsFriend = (Friend1.Count() > 0 && Friend1.First().IsWaiting == 0) || (Friend2.Count() > 0 && Friend2.First().IsWaiting == 0),
                        IsWaitingAccept = Friend2.Count() > 0 && Friend2.First().IsWaiting == 1,
                        IsWaitingResponse = Friend1.Count() > 0 && Friend1.First().IsWaiting == 1
                    });
                }
                Result = Result.OrderByDescending(u => u.IsFriend).ThenByDescending(u => u.IsWaitingResponse).ThenByDescending(u => u.IsWaitingAccept).ToList();
                return PagingResult(Result.Cast<Object>(), page, size);
            }
            catch (Exception ex)
            {
                return FailResult(ex);
            }
        }

        [Route("api/friends/{username}")]
        [HttpPost]
        public object AddFriend(string username)
        {
            try
            {
                var Account = DB.Accounts.Where(u => u.Username == username);
                if (Account.Count() == 0)
                {
                    return ErrorResult(1, "Username is not exists");
                }
                if (DB.Friends.Count(u => u.Username == CurrentAccount.Username && u.FriendUser == username) > 0)
                {
                    return ErrorResult(2, "Already sent add friend");
                }
                if (DB.Friends.Count(u => u.FriendUser == CurrentAccount.Username && u.Username == username) > 0)
                {
                    return ErrorResult(2, "Already sent add friend");
                }
                DB.Friends.InsertOnSubmit(new Models.Friend()
                {
                    Username = CurrentAccount.Username,
                    FriendUser = username,
                    IsWaiting = 1,
                    RequestTime = DateTime.Now
                });
                DB.SubmitChanges();
                return SuccessResult(null);

            }
            catch (Exception ex)
            {
                return FailResult(ex);
            }
        }

        [Route("api/friends/qr/{key}")]
        [HttpPost]
        public object AddFriendByQr(string key)
        {
            try
            {
                SimpleAES AES = new SimpleAES();
                var username = AES.DecryptString(key);
                var Account = DB.Accounts.Where(u => u.Username == username);
                if (Account.Count() == 0)
                {
                    return ErrorResult(1, "Username is not exists");
                }
                if (DB.Friends.Count(u => u.Username == CurrentAccount.Username && u.FriendUser == username) > 0)
                {
                    return SuccessResult(username);
                }
                if (DB.Friends.Count(u => u.FriendUser == CurrentAccount.Username && u.Username == username) > 0)
                {
                    return SuccessResult(username);
                }
                DB.Friends.InsertOnSubmit(new Models.Friend()
                {
                    Username = CurrentAccount.Username,
                    FriendUser = username,
                    IsWaiting = 0,
                    RequestTime = DateTime.Now
                });
                DB.SubmitChanges();
                return SuccessResult(username);

            }
            catch (Exception ex)
            {
                return FailResult(ex);
            }
        }

        [Route("api/friends/requests")]
        [HttpGet]
        public object GetRequests()
        {
            try
            {
                return GetRequests(-1);
            }
            catch (Exception ex)
            {
                return FailResult(ex);
            }
        }

        [Route("api/friends/requests/{milisecond}")]
        [HttpGet]
        public object GetRequests(int milisecond)
        {
            try
            {
                var Requesters = DB.Friends.Where(u => u.FriendUser == CurrentAccount.Username && u.IsWaiting == 1);
                if (milisecond > -1)
                {
                    var FromTime = DateTime.Now.AddMilliseconds(-milisecond);
                    Requesters = Requesters.Where(u => u.RequestTime >= FromTime);
                }
                var Result = new List<object>();
                foreach (var Requester in Requesters)
                {
                    var User = DB.Accounts.Where(u => u.Username == Requester.Username).First();
                    Result.Add(new
                    {
                        Username = User.Username,
                        Name = User.Name,
                        Avatar = User.Avatar,
                        Type = User.Type,
                    });
                }
                DB.SubmitChanges();
                return SuccessResult(Result);
            }
            catch (Exception ex)
            {
                return FailResult(ex);
            }
        }

        [Route("api/friends/waitingresponse/")]
        [HttpGet]
        public object GetWaitingResponse()
        {
            try
            {
                var Friends = DB.Friends.Where(u => u.Username == CurrentAccount.Username && u.IsWaiting == 1)
                    .Select(u => u.FriendUser);
                var Result = new List<object>();
                foreach(var friend in Friends)
                {
                    var User = DB.Accounts.Where(u => u.Username == friend).First();
                    Result.Add(new
                    {
                        Username = User.Username,
                        Name = User.Name,
                        Avatar = User.Avatar,
                        Type = User.Type,
                    });
                }
                return SuccessResult(Result);
            }
            catch (Exception ex)
            {
                return FailResult(ex);
            }
        }

        [Route("api/friends/accept/{username}")]
        [HttpPost]
        public object AcceptFriend(string username)
        {
            try
            {
                var Friend = DB.Friends.Where(u => u.Username == username && u.FriendUser == CurrentAccount.Username);
                if (Friend.Count() == 0)
                {
                    return ErrorResult(1, "Not yet sent add request");
                }
                Friend.First().IsWaiting = 0;
                DB.SubmitChanges();
                return SuccessResult(null);
            }
            catch (Exception ex)
            {
                return FailResult(ex);
            }
        }

        [Route("api/friends/{username}")]
        [HttpDelete]
        public object DeleteFriend(string username)
        {
            try
            {
                var Friend = DB.Friends.Where(u =>
                        (u.Username == username && u.FriendUser == CurrentAccount.Username) ||
                        (u.FriendUser == username && u.Username == CurrentAccount.Username));
                if (Friend.Count() == 0)
                {
                    return ErrorResult(1, "Not yet sent add request");
                }
                DB.Friends.DeleteAllOnSubmit(Friend);
                DB.SubmitChanges();
                return SuccessResult(null);
            }
            catch (Exception ex)
            {
                return FailResult(ex);
            }
        }

    }
}
