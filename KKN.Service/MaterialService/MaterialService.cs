using KKN.Core;
using KKN.Dao.MaterialDao;
using KKN.Model.MaterialModel;
using Microsoft.Extensions.Configuration;
using System;
using System.Threading.Tasks;

namespace KKN.Service.MaterialService
{
    public class MaterialService
    {
        #region GetItemMasterList
        public static async Task<MaterialDTO> GetItemMasterList(IConfiguration config)
        {
            var result = new MaterialDTO();

            try
            {
                var getItemList_t = MaterialDao.GetItemMasterList(config);
                var getItemGroupList_t = MaterialDao.GetItemGroupList(config);

                result.ItemMasterList = await getItemList_t;
                result.ItemGroupList = await getItemGroupList_t;
            }
            catch (Exception ex)
            {
                result.Response.DoError(ex);
            }

            return result;
        }
        #endregion

        #region GetItemMasterDataTable
        public static async Task<MaterialDTO> GetItemMasterDataTable(IConfiguration config)
        {
            var result = new MaterialDTO();

            try
            {
                var getItemDataTable_t = MaterialDao.GetItemMasterDataTable(config);
                result.ItemMasterDataTable = await getItemDataTable_t;
            }
            catch (Exception ex)
            {
                result.Response.DoError(ex);
            }

            return result;
        }
        #endregion

        #region Save
        public static Task<MaterialDTO> Save(IConfiguration config)
        {

            return null;
        }
        #endregion

        #region SaveMaterialAcc
        public static async Task<MaterialDTO> SaveMaterialAcc(IConfiguration config, MaterialDTO data)
        {
            var result = new MaterialDTO();
            int rowComplete = 0;

            try
            {
                using (var trans = DbHelper.BeginTransaction())
                {
                    var saveMatAcc_t = MaterialDao.SaveMaterialAcc(config);
                    rowComplete = await saveMatAcc_t;

                    if (rowComplete > 0)
                    {
                        trans.Complete();
                    }
                }
                result.Response.IsSuccess = (rowComplete > 0);
            }
            catch (Exception ex)
            {
                result.Response.DoError(ex);
            }
           
            return result;
        }
        #endregion

        #region DeleteMaterialAcc
        public static async Task<MaterialDTO> DeleteMaterialAcc(IConfiguration config, int id)
        {
            var result = new MaterialDTO();
            int rowComplete = 0;

            try
            {
                using (var trans = DbHelper.BeginTransaction())
                {
                    var delMaterialAcc_t = MaterialDao.DeleteMaterialAcc(config, id);
                    rowComplete = await delMaterialAcc_t;
                }
                result.Response.IsSuccess = (rowComplete > 0);
            }
            catch (Exception ex)
            {
                result.Response.DoError(ex);
            }

            return result;
        }
        #endregion

    }
}
