using KKN.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KKN.VP.API
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class BaseAPIController : ControllerBase
    {
        //protected object OkResult(object data)
        //{
        //    var xx = data.GetType();
        //    //((JObject)data).Add(new ServiceResultModel());
        //    var serModel = new ServiceResultModel();
        //    return Ok(new { data, serModel });
        //}
    }
}
