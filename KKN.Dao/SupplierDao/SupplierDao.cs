using KKN.Core;
using KKN.Model.SupplierModel;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KKN.Dao.SupplierDao
{
    public class SupplierDao
    {
        #region copy

        #endregion

        #region GetSupplierList
        public static Task<List<SupplierModel>> GetSupplierList(IConfiguration config)
        {
            var connString = config.GetDbConnection("Supplier");

            return DbHelper.ExecuteReaderAsync<SupplierModel>
                (
                    connString,
                     CommandType.StoredProcedure,
                    "SupplierRead"
                );
        }
        #endregion

        #region GetMaterialGroupList
        public static Task<List<MaterialGroup>> GetMaterialGroupList(IConfiguration config)
        {
            var connString = config.GetDbConnection("Supplier");

            return DbHelper.ExecuteReaderAsync<MaterialGroup>
                (
                    connString,
                    CommandType.StoredProcedure,
                    "MaterialGroupRead"
                );
        }
        #endregion

        #region GetSupplierGroupList
        public static Task<List<SupplierGroupModel>> GetSupplierGroupList(IConfiguration config)
        {
            var connString = config.GetDbConnection("Supplier");

            return DbHelper.ExecuteReaderAsync<SupplierGroupModel>
                (
                    connString,
                    CommandType.StoredProcedure,
                    "SupplierGroupRead"
                );
        }
        #endregion

        #region GetSupplierMaterialGroupRefList
        public static Task<List<SupplierMaterailGroupRefModel>> GetSupplierMaterialGroupRefList(IConfiguration config, int id)
        {
            var connString = config.GetDbConnection("Supplier");

            return DbHelper.ExecuteReaderAsync<SupplierMaterailGroupRefModel>
                (
                    connString,
                    CommandType.StoredProcedure,
                    "SupplierMaterailGroupRefRead",
                    p =>
                        {
                            p.AddWithValue("SupplierId", id);
                        }
                 );
        }
        #endregion

        #region SaveSupplier
        public static Task<int> SaveSupplier(IConfiguration config, SupplierDTO supplierDTOData)
        {
            var connString = config.GetDbConnection("Supplier");
            var supplier = supplierDTOData.SupplierList.FirstOrDefault();
            var ProcedureName = "SupplierCreate";
            if (supplier.SupplierId != -1)
            {
                ProcedureName = "SupplierUpdate";
            }
            if (supplier != null)
            {
                return DbHelper.ExecuteNoneQueryAsync
                    (
                       connString,
                       CommandType.StoredProcedure,
                       ProcedureName,
                       p =>
                       {
                           p.AddWithValue("SupplierId", supplier.SupplierId);
                           p.AddWithValue("SupplierName", supplier.SupplierName);
                           p.AddWithValue("Address", supplier.Address);
                           p.AddWithValue("Tumbon", supplier.Tumbon);
                           p.AddWithValue("Amphur", supplier.Amphur);
                           p.AddWithValue("Province", supplier.Province);
                           p.AddWithValue("PostCode", supplier.PostCode);
                           p.AddWithValue("ContactPerson", supplier.ContactPerson);
                           p.AddWithValue("ContactPersonPosition", supplier.ContactPersonPosition);
                           p.AddWithValue("MobilePhone", supplier.MobilePhone);
                           p.AddWithValue("Phone", supplier.Phone);
                           p.AddWithValue("Fax", supplier.Fax);
                           p.AddWithValue("Email", supplier.Email);
                           p.AddWithValue("PaymentType", supplier.PaymentType);
                           p.AddWithValue("PaymentCondition", supplier.PaymentCondition);
                           p.AddWithValue("Deliver", supplier.Deliver);
                           p.AddWithValue("Notes", supplier.Notes);
                           p.AddWithValue("SupplierGroupId", supplier.SupplierGroupId);
                           //p.AddWithValue("CreateDate", supplier.CreateDate);
                           //p.AddWithValue("CreateByUserId", supplier.CreateByUserId);
                           //p.AddWithValue("InActive", supplier.InActive);
                           //p.AddWithValue("ModifiedDate", supplier.ModifiedDate);
                           //p.AddWithValue("ModifiedBy", supplier.ModifiedBy);
                       }
                    );
            }
            else
            {
                return Task<int>.Run(() => { return -1; });
            }
        }

        #endregion

        #region DeleteSupplier
        public static Task<int> DeleteSupplier(IConfiguration config, int id)
        {
            var connString = config.GetDbConnection("Supplier");
            return DbHelper.ExecuteNoneQueryAsync(connString, CommandType.Text, "DELETE Supplier WHERE SupplierId = " + id);
        }
        #endregion

    }
}
