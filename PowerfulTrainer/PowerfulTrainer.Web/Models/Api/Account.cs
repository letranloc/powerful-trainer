using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PowerfulTrainer.Web.Models.Api
{
    public class RegisterReq:UpdateAccountReq
    {
        public string Username;
    }

    public class UpdateAccountReq
    {    
        public string Name;
        public short? Gender;
        public short? Type;
        public DateTime? Birthday;
        public string Avatar;
        public string Password;
    }

    public class LoginReq
    {
        public string Username;
        public string Password;
    }
}