using KKN.Service.SupplierService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using System.Threading.Tasks;
using KKN.Model.AuthenticationModel;
using KKN.Model.SupplierModel;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System;


namespace KKN.VP.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class SupplierController : ControllerBase
    {

        #region Member
        IConfiguration config;
        #endregion

        #region Constructor
        public SupplierController(IConfiguration config)
        {
            this.config = config;
        }
        #endregion

        #region GetDataSupplierList
        [HttpGet("[action]")]
        public async Task<object> GetDataSupplierList()

        {
            var getSupplierList_t = SupplierService.GetSupplierList(config);

            var resultList = await getSupplierList_t;

            //resultList.Response.AddMessage(resultList.Response.Messages);

            return Ok(new
            {
                supplierList = resultList.SupplierList,
                materialGroupList = resultList.MaterialGroupList,

                response = resultList.Response
            });
        }
        #endregion

        #region GetDataSupplierGroupList
        [HttpGet("[action]")]
        public async Task<object> GetDataSupplierGroupList()

        {
            var getSupplierGroupList_t = SupplierService.GetSupplierGroupList(config);

            var resultList = await getSupplierGroupList_t;

            //resultList.Response.AddMessage(resultList.Response.Messages);

            return Ok(new
            {
                supplierGroupList = resultList.SupplierGroupList,

                response = resultList.Response
            });
        }
        #endregion

        #region saveSupplierList
        [HttpPost("[action]")]
        public async Task<object> SaveSupplierList(JObject data)

        {
            var supplierDate = new SupplierDTO();
            var suplist = new List<SupplierModel>();
            object resultSave = null;
            try
            {
                var Supplier = data["SupplierList"].ToObject<SupplierModel>();
                suplist.Add(Supplier);
                supplierDate.SupplierList = suplist;

                var saveSupplierList_t = SupplierService.SaveSupplierList(config, supplierDate);

                resultSave = await saveSupplierList_t;

            }
            catch (Exception ex)
            {
                return ex;
            }

            //var resultSave = await saveSupplierList_t;

            return Ok(new
            {
                response = resultSave
                //response = resultSave.Response
            });
        }
        #endregion


        #region GetToken
        [HttpGet("[action]")]
        public object GetToken(string userName)
        {
            return JwtHelper.CreateToken(userName);

        }
        #endregion

        //public IActionResult Index()
        //{
        //    return View();
        //}
    }
}
