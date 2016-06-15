using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PowerfulTrainer.Web.Models.Api
{
    public class FriendSearchRes
    {
        public string Username;
        public string Name;
        public string Avatar;
        public short? Type;
        public bool IsFriend;
        public bool IsWaitingAccept;
        public bool IsWaitingResponse;
    }
}