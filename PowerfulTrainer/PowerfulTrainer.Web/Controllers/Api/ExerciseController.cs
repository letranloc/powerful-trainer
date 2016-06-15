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
    public class ExerciseController : CheckTokenController
    {
        [Route("api/exercise")]
        [HttpGet]
        public object Get(String BodyPart = null, string Level=null, string Focus = null)
        {
            try
            {
                var ListExercis = DB.Exercises.Where(u => true);
                if (BodyPart != null)
                {
                    ListExercis = ListExercis.Where(u => u.BodyParts == BodyPart);
                }
                if (Level != null)
                {
                    ListExercis = ListExercis.Where(u => u.DifficultyLevel == Level);
                }
                if (Focus != null)
                {
                    ListExercis = ListExercis.Where(u => u.Focus.Contains(Focus));
                }
                return SuccessResult(ListExercis.ToArray());
            }
            catch(Exception ex)
            {
                return FailResult(ex);
            }
        }

        [Route("api/exercise/level")]
        [HttpGet]
        public object GetLevel()
        {
            try
            {
                return SuccessResult(DB.Exercises.Select(u=>u.DifficultyLevel).Distinct().Where(u=>!string.IsNullOrEmpty(u)).ToArray());
            }
            catch (Exception ex)
            {
                return FailResult(ex);
            }
        }

        [Route("api/exercise/focus")]
        [HttpGet]
        public object GetFocus()
        {
            try
            {
                var Focus = DB.Exercises.Select(u => u.Focus).Distinct().Where(u => !string.IsNullOrEmpty(u)).ToList();
                var ListFocus = new List<string>();
                Focus.ForEach(u => u.Split(',').ToList().ForEach(v => ListFocus.Add(v.Trim())));
                return SuccessResult(ListFocus.Distinct().ToArray());
            }
            catch (Exception ex)
            {
                return FailResult(ex);
            }
        }

        [Route("api/exercise/bodypart")]
        [HttpGet]
        public object GetBodyPart()
        {
            try
            {
                return SuccessResult(DB.Exercises.Select(u => u.BodyParts).Distinct().Where(u => !string.IsNullOrEmpty(u)).ToArray());
            }
            catch (Exception ex)
            {
                return FailResult(ex);
            }
        }
    }
}
