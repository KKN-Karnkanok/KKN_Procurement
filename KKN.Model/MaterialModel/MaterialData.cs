using System.Collections.Generic;
using System.Data;

namespace KKN.Model.MaterialModel
{
    public class MaterialData
    {
        public List<ItemMasterModel> ItemMasterList { get; set; }
        public List<ItemGroupModel> ItemGroupList { get; set; }
        public DataTable ItemMasterDataTable { get; set; }

        public ResponseResultModel Response { get; set; } = new ResponseResultModel();
    }
}
