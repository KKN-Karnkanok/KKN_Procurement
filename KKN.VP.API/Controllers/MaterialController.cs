using KKN.Model.AuthenticationModel;
using KKN.Model.MaterialModel;
using KKN.Service.MaterialService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Threading.Tasks;

namespace KKN.VP.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class MaterialController : ControllerBase
    {
        #region Member
        IConfiguration config;
        #endregion

        #region Constructor
        public MaterialController(IConfiguration config)
        {
            this.config = config;
        }
        #endregion

        #region GetDataList
        [HttpGet("[action]")]
        [Authorize]
        public async Task<object> GetDataList()
        {
            string token = JwtHelper.RetrieveToken(Request);



            var getItemMaster_t = MaterialService.GetItemMasterList(config);
            var getItemDataTable_t = MaterialService.GetItemMasterDataTable(config);

            var resultList = await getItemMaster_t;
            var resultDataTable = await getItemDataTable_t;

            resultList.Response.AddMessage(resultDataTable.Response.Messages);

            return Ok(new
            {
                itemMasterList = resultList.ItemMasterList,
                itemGroupList = resultList.ItemGroupList,

                itemMasterTable = resultDataTable.ItemMasterDataTable,

                response = resultList.Response

            });
        }
        #endregion

        #region SaveData
        [HttpPost("[action]")]
        [Authorize]
        public async Task<object> SaveData(JObject data)
        {
            var materialData = new MaterialDTO();
            materialData.ItemMasterList = data["itemMasterList"].ToObject<List<ItemMasterModel>>();
            materialData.ItemGroupList = data["itemGroupList"].ToObject<List<ItemGroupModel>>();

            var saveMaterialAcc_t = MaterialService.SaveMaterialAcc(config, materialData);

            var resultSave = await saveMaterialAcc_t;

            return Ok(new { response = resultSave.Response });
        }
        #endregion

        #region DeleteData
        [HttpDelete("[action]")]
        public async Task<object> DeleteData(int id)
        {
            var delMaterialAcc_t = MaterialService.DeleteMaterialAcc(config, id);

            var resultSave = await delMaterialAcc_t;

            return Ok(new { response = resultSave.Response });
        }
        #endregion

        [HttpGet("[action]")]

        public object GetToken(string userName)
        {
            return JwtHelper.CreateToken(userName);

        }
    }
}
