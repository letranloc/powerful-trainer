using PowerfulTrainer.Web.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Windows.Storage;
using Windows.Storage.Streams;

namespace PowerfulTrainer.Web.Controllers.Api
{
    public class ExerciseController : BaseApiController
    {
        [Route("api/exercise")]
        [HttpGet]
        public object GetAll()
        {
            var Result = DB.Exercises.Select(u => new
            {
                Video = u.VideoId,
                Image = u.Image
            }).ToArray();
            return Json(Result);
        }
        private byte[] ReadStream(Stream stream, int initialLength)
        {
            if (initialLength < 1)
            {
                initialLength = 32768;
            }
            byte[] buffer = new byte[initialLength];
            int read = 0;
            int chunk;
            while ((chunk = stream.Read(buffer, read, buffer.Length - read)) > 0)
            {
                read += chunk;
                if (read == buffer.Length)
                {
                    int nextByte = stream.ReadByte();
                    if (nextByte == -1)
                    {
                        return buffer;
                    }
                    byte[] newBuffer = new byte[buffer.Length * 2];
                    Array.Copy(buffer, newBuffer, buffer.Length);
                    newBuffer[read] = (byte)nextByte;
                    buffer = newBuffer;
                    read++;
                }
            }
            byte[] bytes = new byte[read];
            Array.Copy(buffer, bytes, read);
            return bytes;
        }

        [Route("api/import")]
        [HttpGet]
        public object Import()
        {
            DB.Exercies.ToList().ForEach(u =>
            {
                try
                {
                    string Image = "";
                    try
                    {
                        if (!string.IsNullOrEmpty(u.VideoId))
                        {
                            using (var stream = new MemoryStream())
                            {
                                var convert = new NReco.VideoConverter.FFMpegConverter();
                                convert.GetVideoThumbnail(String.Format(@"https://az803746.vo.msecnd.net/tenant/amp/entityid/{0}?blobrefkey=103", u.VideoId), stream);
                                stream.Position = 0;
                                var ReadBuffer = ReadStream(stream, (int)stream.Length);
                                Image = Convert.ToBase64String(ReadBuffer);
                            }
                        }
                    }
                    catch { }
                    DB.Exercises.InsertOnSubmit(new Exercise()
                    {
                        BodyParts = u.BodyParts,
                        DifficultyLevel = u.DifficultyLevel,
                        Equipment = u.Equipment,
                        Image = Image,
                        Focus = u.Focus,
                        Id = u.Id,
                        IsRest = u.IsRest,
                        Name = u.Name,
                        Thumbnail = u.Thumbnail,
                        VideoId = u.VideoId
                    });
                    DB.SubmitChanges();
                }
                catch { }
            });
            return Ok();
        }
    }
}
