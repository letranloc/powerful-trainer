using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace PowerfulTrainer
{
    public class HttpClient
    {
        private static object LockObj = new object();
        public static async Task<T> Post<T>(string Url, object Request)
        {
            try
            {
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(Url);
                request.ContentType = "application/json";
                request.Method = "POST";
                request.Headers["Authorization"] = AppManagement.AccessToken;
                var stream = request.GetRequestStreamAsync().Result;
                using (var writer = new StreamWriter(stream))
                {
                    writer.Write(JsonConvert.SerializeObject(Request));
                    writer.Flush();
                    writer.Dispose();
                }


                var response = await request.GetResponseAsync();
                try
                {
                    var respStream = response.GetResponseStream();
                    using (StreamReader sr = new StreamReader(respStream))
                    {
                        return JsonConvert.DeserializeObject<T>(sr.ReadToEnd());
                    }
                }
                catch
                {
                    return default(T);
                }
            }
            catch
            {
                return default(T);
            }
        }

        public static async Task<T> Get<T>(string Url)
        {
            try
            {
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(Url);
                request.ContentType = "application/json";
                request.Method = "GET";
                if (AppManagement.AccessToken != null)
                {
                    request.Headers["Authorization"] = AppManagement.AccessToken;
                }
                var response = await request.GetResponseAsync();
                try
                {
                    var respStream = response.GetResponseStream();
                    using (StreamReader sr = new StreamReader(respStream))
                    {
                        return JsonConvert.DeserializeObject<T>(sr.ReadToEnd());
                    }
                }
                catch
                {
                    return default(T);
                }
            }
            catch
            {
                return default(T);
            }
        }
    }
}
