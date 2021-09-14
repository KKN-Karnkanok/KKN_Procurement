using KKN.Core;
using KKN.Model;
using KKN.Model.MaterialModel;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KKN.Dao.MaterialDao
{
    public class MaterialDao
    {
        #region GetItemMasterList
        public static Task<List<ItemMasterModel>> GetItemMasterList(IConfiguration config)
        {
            var connString = config.GetDbConnection("KKN_Material");
            return DbHelper.ExecuteReaderAsync<ItemMasterModel>(connString, CommandType.StoredProcedure, "Item_Master_GetAll"
                 , p =>
                 {
                     p.AddWithValue("ItemPerPage", 10);
                     p.AddWithValue("PageIndex", 1);
                 });
        }
        #endregion

        #region GetItemGroupList
        public static Task<List<ItemGroupModel>> GetItemGroupList(IConfiguration config)
        {
            var connString = config.GetDbConnection("KKN_Material");
            return DbHelper.ExecuteReaderAsync<ItemGroupModel>(connString, CommandType.StoredProcedure, "Group_Item_GetAll");
        }
        #endregion

        #region GetItemMasterDataTable
        public static Task<DataTable> GetItemMasterDataTable(IConfiguration config)
        {
            var connString = config.GetDbConnection("KKN_Material");
            return DbHelper.ExecuteReaderAsync(connString, CommandType.StoredProcedure, "Item_Master_GetAll"
                , p =>
                {
                    p.AddWithValue("ItemPerPage", 10);
                    p.AddWithValue("PageIndex", 1);
                });
        }
        #endregion

        #region Save MaterialAcc
        public static Task<int> SaveMaterialAcc(IConfiguration config)
        {
            var connString = config.GetDbConnection("KKN_Material");
            return DbHelper.ExecuteNoneQueryAsync(connString, CommandType.StoredProcedure, "material_accCreate", p => p.AddWithValue("material_acc_name", "987654"));
        }
        #endregion

        #region DeleteMaterialAcc
        public static Task<int> DeleteMaterialAcc(IConfiguration config, int id)
        {
            var connString = config.GetDbConnection("KKN_Material");
            return DbHelper.ExecuteNoneQueryAsync(connString, CommandType.Text, "DELETE material_acc WHERE material_acc_id = " + id);
        }
        #endregion

    }
}
