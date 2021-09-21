using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KKN.Model.SupplierModel
{
    public class SupplierDTO
    {
        public List<SupplierModel> SupplierList { get; set; }
        public List<SupplierGroupModel> SupplierGroupList { get; set; }
        public List<SupplierMaterailGroupRefModel> SupplierMaterailGroupRefList { get; set; }
        public List<MaterialGroup> MaterialGroupList { get; set; }

        public ResponseResultModel Response { get; set; } = new ResponseResultModel();
    }
}
