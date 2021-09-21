using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KKN.Model.SupplierModel
{
    public class SupplierModel
    {
        public int SupplierId { get; set; }
        public string SupplierName { get; set; }
        public string Address { get; set; }
        public string Tumbon { get; set; }
        public string Amphur { get; set; }
        public string Province { get; set; }
        public string PostCode { get; set; }
        public string ContactPerson { get; set; }
        public string ContactPersonPosition { get; set; }
        public string MobilePhone { get; set; }
        public string Phone { get; set; }
        public string Fax { get; set; }
        public string Email { get; set; }
        public string PaymentType { get; set; }
        public string PaymentCondition { get; set; }
        public string Deliver { get; set; }
        public string Notes { get; set; }
        public int SupplierGroupId { get; set; }
        public DateTime? CreateDate { get; set; }
        public int CreateByUserId { get; set; }
        public bool InActive { get; set; }
        public DateTime ModifiedDate { get; set; }
        public int ModifiedBy { get; set; }

    }
}
