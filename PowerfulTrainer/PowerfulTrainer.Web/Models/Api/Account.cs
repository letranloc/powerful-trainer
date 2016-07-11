using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PowerfulTrainer.Web.Models.Api
{
    public class RegisterReq
    {
        public string Username;
        public string Name;
        public short? Gender;
        public short? Type;
        public DateTime? Birthday;
        public string Avatar;
        public string Password;
        public string Phone;
    }

    public class UpdateAccountReq
    {    
        public string Name;
        public short? Gender;
        public short? Type;
        public DateTime? Birthday;
        public string Avatar;
        public string Password;
        public string Phone;
        public string CurrentPassword;
    }

    public class UpdateMSAccountReq
    {
        public string MSAccessToken;
        public string MSRefreshToken;
        public DateTime? MSExpireDate;
    }

    public class LoginReq
    {
        public string Username;
        public string Password;
    }
}