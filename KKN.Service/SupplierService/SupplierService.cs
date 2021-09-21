using KKN.Core;
using KKN.Dao.SupplierDao;
using KKN.Model.SupplierModel;
using Microsoft.Extensions.Configuration;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KKN.Service.SupplierService
{
    public class SupplierService
    {
        #region GetSupplierList
        public static async Task<SupplierDTO> GetSupplierList(IConfiguration config)
        {
            var result = new SupplierDTO();

            try
            {
                var getSupplierList_t = SupplierDao.GetSupplierList(config);
                var getMaterialGroupList_t = SupplierDao.GetMaterialGroupList(config);

                result.SupplierList = await getSupplierList_t;
                result.MaterialGroupList = await getMaterialGroupList_t;
            }
            catch (Exception ex)
            {
                result.Response.DoError(ex);
            }
            return result;
        }
        #endregion

        #region GetSupplierGroupList
        public static async Task<SupplierDTO> GetSupplierGroupList(IConfiguration config)
        {
            var result = new SupplierDTO();

            try
            {
                var getSupplierGroupList_t = SupplierDao.GetSupplierGroupList(config);

                result.SupplierGroupList = await getSupplierGroupList_t;
            }
            catch (Exception ex)
            {
                result.Response.DoError(ex);
            }
            return result;
        }
        #endregion

        #region SaveSupplierList
        public static async Task<SupplierDTO> SaveSupplierList(IConfiguration config, SupplierDTO data)
        {
            var result = new SupplierDTO();
            int rowComplete = 0;
            try
            {
                using (var trans = DbHelper.BeginTransaction())
                {
                    var saveSupplier_t = SupplierDao.SaveSupplier(config, data);
                    rowComplete = await saveSupplier_t;

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
    }
}
