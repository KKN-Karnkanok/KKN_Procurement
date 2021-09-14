using System;

namespace KKN.Model.MaterialModel
{
    public class ItemMasterModel
    {
        public int ItemID { get; set; }
        public string ItemNo { get; set; }
        public string ItemName { get; set; }


        public string Description { get; set; }
        public bool Status { get; set; }
        public int AccID { get; set; }
        public int CostMethodID { get; set; }
        public bool StockCount { get; set; }
        public bool OverDrawStock { get; set; }
        public string PicturePath { get; set; }
        public string Brand { get; set; }
        public string Version { get; set; }
        public string Color { get; set; }
        public string Size { get; set; }
        public int UomIn { get; set; }
        public decimal QtyIn { get; set; }
        public int UomStock { get; set; }
        public decimal QtyStock { get; set; }
        public int Msg { get; set; }

        public int GroupID { get; set; }
        public string GroupName { get; set; }


        public int CategoryID { get; set; }
        public string CategoryName { get; set; }

    }
}
