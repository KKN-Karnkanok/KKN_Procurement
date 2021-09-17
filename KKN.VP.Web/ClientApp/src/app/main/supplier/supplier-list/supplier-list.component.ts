import {
  Component,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from "@angular/core";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { ColumnMode, SelectionType } from "@swimlane/ngx-datatable";
import { Subject } from "rxjs";

@Component({
  selector: "app-supplier-list",
  templateUrl: "./supplier-list.component.html",
  styleUrls: ["./supplier-list.component.scss"],
  /////กำหนดใช้tool////////
  encapsulation: ViewEncapsulation.None,
})
export class SupplierListComponent implements OnInit, OnDestroy {
  //////กำหนดnav////////
  public contentHeader: object;

  //////OnDestroy////////
  private _unsubscribeAll: Subject<any>;

  ///////
  newData = {
    supplierName: "",
    // supplierGroupName: "",
    // address:  "",
    // tumbon:  "",
    // amphur:  "",
    // province:  "",
    postcode: "",
    contactPerson: "",
    contactPersonPosition: "",
    mobilePhone: "",
    phone: "",
    fax: "",
    email: "",
    // paymentType: "",
    paymentCondition: "",
    deliver: "",
    notes: "",
  };
  // supplierId: "",
  //   supplierGroupName: "",
  //   supplierName: "",
  //   address: "",
  //   tumbon: "",
  //   amphur: "",
  //   province: "",
  //   postcode: "",
  //   contactPerson: "",
  //   contactPersonPosition: "",
  //   mobilePhone: "",
  //   phone: "",
  //   fax: "",
  //   email: "",
  //   paymentType: "",
  //   paymentCondition: "",
  //   deliver: "",
  //   notes: "",
  //   // supplierGroupId           :'',
  //   createDate: "",
  //   createByUserId: "",
  //   inActive: "",
  //   modifiedDate: "",
  //   modifiedBy: "",
  //   // supplierGroupId           :'',
  //   // createDate                :'',
  //   // createBy                  :'',
  //   // modifiedDate              :'',
  //   // modifiedBy                :'',
  //   // supplierId                :'',
  //   // materialGroupId           :'',

  public selectGroup = [
    {
      groupcode: "CC",
      groupname: "Concrete",
      active: 1,
    },
    {
      groupcode: "ce",
      groupname: "Steel",
      active: 1,
    },
    {
      groupcode: "cf",
      groupname: "Wood",
      active: 1,
    },
    {
      groupcode: "Ct",
      groupname: "Electrical",
      active: 1,
    },
    {
      groupcode: "Cp",
      groupname: "Sanitary",
      active: 1,
    },
    {
      groupcode: "Cp",
      groupname: "Colour/Paint",
      active: 1,
    },
    {
      groupcode: "Cp",
      groupname: "Tools",
      active: 1,
    },
    {
      groupcode: "Cp",
      groupname: "ของแถม",
      active: 2,
    },
    {
      groupcode: "Cp",
      groupname: "ไอเทมรวม",
      active: 2,
    },
    {
      groupcode: "Cp",
      groupname: "ของใหม่",
      active: 2,
    },
    {
      groupcode: "Cp",
      groupname: "ทดสอบ active ",
      active: 2,
    },
  ];
  //////////////////

  rowSelect = this.newData;
  // rowSelect= Object;

  ///////////datatable///////////
  public selected = [];
  public kitchenSinkRows: any;
  public basicSelectedOption: number = 10;
  public ColumnMode = ColumnMode;
  public SelectionType = SelectionType;
  ////////////////////////////

  public rows = [
    {
      supplierName: "บจก. พาณิชย์วิบูลย์เชียงใหม่",
      supplierGroupName: "Wood",
      address: "192-192/1-4 ถ.ช้างเผือก",
      tumbon: "ช้างเผือก",
      amphur: "เมืองเชียงใหม่",
      province: "เชียงใหม่",
      postcode: "50300",
      contactPerson: "คุณปุ๊ ",
      contactPersonPosition: "ขายโครงการ",
      mobilePhone: "081 8823752",
      phone: "053 211909",
      fax: "053 216731",
      email: "",
      paymentType: "จ่ายเชื่อ",
      paymentCondition: "เครดิต 60 วัน",
      deliver: "ส่งถึงหน้างาน",
      notes: "",
      groupMat: [
        {
          groupname: "Concrete",
        },
        {
          groupname: "Steel",
        },
        {
          groupname: "Wood",
        },
        {
          groupname: "Electrical",
        },
        {
          groupname: "Sanitary",
        },
        {
          groupname: "Colour/Paint",
        },
        {
          groupname: "Tools",
        },
        {
          groupname: "ของแถม",
        },
        {
          groupname: "ไอเทมรวม",
        },
        {
          groupname: "ของใหม่",
        },
        {
          groupname: "ทดสอบ active ",
        },
      ],
    },
    {
      supplierName: "บจก. เชียงใหม่ วีระวิศวการ",
      supplierGroupName: "Concrete",
      address: "44-44/1-2 ม.5 ถ.ซุปเปอร์ไฮเวย์",
      tumbon: "ฟ้าฮ่าม",
      amphur: "เมืองเชียงใหม่",
      province: "เชียงใหม่",
      postcode: "50000",
      contactPerson: "คุณออย คุณตู่",
      contactPersonPosition: "ฝ่ายขายโครงการ",
      mobilePhone: "0979235907",
      phone: "0538501004",
      fax: "053852344",
      email: "",
      paymentType: "จ่ายเชื่อ",
      paymentCondition: "เงินสด",
      deliver: "ส่งถึงหน้างาน",
      notes: "",
      groupMat: [
        {
          groupname: "Concrete",
        },
        {
          groupname: "Steel",
        },
        {
          groupname: "Wood",
        },
        {
          groupname: "Electrical",
        },
        {
          groupname: "Sanitary",
        },
        {
          groupname: "Colour/Paint",
        },
        {
          groupname: "Tools",
        },
        {
          groupname: "ของแถม",
        },
        {
          groupname: "ไอเทมรวม",
        },
        {
          groupname: "ของใหม่",
        },
        {
          groupname: "ทดสอบ active ",
        },
      ],
    },
    {
      supplierName: "บจก. เชียงใหม่ วิทยาพาณิชย์ (1997)",
      supplierGroupName: "Steel",
      address: "90 ม.5",
      tumbon: "ไชยสถาน   ",
      amphur: "สารภี   ",
      province: "เชียงใหม่   ",
      postcode: "50000",
      contactPerson: "คุณดิ่ง",
      contactPersonPosition: "ฝ่ายขายโครงการ",
      mobilePhone: "085 6956694",
      phone: "053 850891 ",
      fax: "053 115719",
      email: "",
      paymentType: "จ่ายเชื่อ",
      paymentCondition: "เครดิต 30 วัน",
      deliver: "ส่งถึงหน้างาน",
      notes: "",
      groupMat: [
        {
          groupname: "Concrete",
        },
        {
          groupname: "Steel",
        },
        {
          groupname: "Wood",
        },
        {
          groupname: "Electrical",
        },
        {
          groupname: "Sanitary",
        },
        {
          groupname: "Colour/Paint",
        },
        {
          groupname: "Tools",
        },
        {
          groupname: "ของแถม",
        },
        {
          groupname: "ไอเทมรวม",
        },
        {
          groupname: "ของใหม่",
        },
        {
          groupname: "ทดสอบ active ",
        },
      ],
    },
    {
      supplierName: "บจก. ทวีพรรณวัสดุก่อสร้าง",
      supplierGroupName: "Wood",
      address: "3/15 ม.5 ถ.เชียงใหม่-ลำปาง",
      tumbon: "ท่าศาลา   ",
      amphur: "เมืองเชียงใหม่   ",
      province: "เชียงใหม่   ",
      postcode: "50000",
      contactPerson: "คุณวิทยา",
      contactPersonPosition: "ฝ่ายขายโครงการ",
      mobilePhone: "0846111259",
      phone: "053850555",
      fax: "053850850 ",
      email: "",
      paymentType: "จ่ายเชื่อ",
      paymentCondition: "เครดิต 30 วัน",
      deliver: "ส่งถึงหน้างาน",
      notes: "",
      groupMat: [
        {
          groupname: "Concrete",
        },
        {
          groupname: "Steel",
        },
        {
          groupname: "Wood",
        },
        {
          groupname: "Electrical",
        },
        {
          groupname: "Sanitary",
        },
        {
          groupname: "Colour/Paint",
        },
        {
          groupname: "Tools",
        },
        {
          groupname: "ของแถม",
        },
        {
          groupname: "ไอเทมรวม",
        },
        {
          groupname: "ของใหม่",
        },
        {
          groupname: "ทดสอบ active ",
        },
      ],
    },

    {
      supplierName: "หจก. ภาคเหนือตะแกรงเหล็ก",
      supplierGroupName: "Wood",
      address: "108/1 ม.7",
      tumbon: "ท่าวังตาล   ",
      amphur: "สารภี   ",
      province: "เชียงใหม่   ",
      postcode: "50000",
      contactPerson: "คุณอ้อม",
      contactPersonPosition: "ฝ่ายขายโครงการ",
      mobilePhone: "0840418785",
      phone: "0530213423",
      fax: "053021333",
      email: "",
      paymentType: "จ่ายเชื่อ",
      paymentCondition: "เครดิต 30 วัน",
      deliver: "ส่งถึงหน้างาน",
      notes: "",
      groupMat: [
        {
          groupname: "Concrete",
        },
        {
          groupname: "Steel",
        },
        {
          groupname: "Wood",
        },
        {
          groupname: "Electrical",
        },
        {
          groupname: "Sanitary",
        },
        {
          groupname: "Colour/Paint",
        },
        {
          groupname: "Tools",
        },
        {
          groupname: "ของแถม",
        },
        {
          groupname: "ไอเทมรวม",
        },
        {
          groupname: "ของใหม่",
        },
        {
          groupname: "ทดสอบ active ",
        },
      ],
    },
    {
      supplierName: "หจก. รัตนสุข โลหะกิจ",
      supplierGroupName: "Sanitary",
      address: "426/5 ถ.เชียงใหม่-ลำปาง",
      tumbon: "หนองป่าครั่ง   ",
      amphur: "เมืองเชียงใหม่   ",
      province: "เชียงใหม่   ",
      postcode: "50140",
      contactPerson: "คุณหนุ่ย",
      contactPersonPosition: "ผู้จัดการห้าง",
      mobilePhone: "081 7240541",
      phone: "053 240049",
      fax: "053 260427",
      email: "",
      paymentType: "จ่ายเชื่อ",
      paymentCondition: "เครดิต 30 วัน",
      deliver: "ส่งถึงหน้างาน",
      notes: "",
      groupMat: [
        {
          groupname: "Concrete",
        },
        {
          groupname: "Steel",
        },
        {
          groupname: "Wood",
        },
        {
          groupname: "Electrical",
        },
        {
          groupname: "Sanitary",
        },
        {
          groupname: "Colour/Paint",
        },
        {
          groupname: "Tools",
        },
        {
          groupname: "ของแถม",
        },
        {
          groupname: "ไอเทมรวม",
        },
        {
          groupname: "ของใหม่",
        },
        {
          groupname: "ทดสอบ active ",
        },
      ],
    },
    {
      supplierName: "บจก. มชุดาไล้ติ้งเซ็นเตอร์",
      supplierGroupName: "Colour/Paint",
      address: "8 ม.6 ถ.ซุปเปอร์ไฮเวย์",
      tumbon: "หนองป่าครั่ง   ",
      amphur: "เมืองเชียงใหม่   ",
      province: "เชียงใหม่   ",
      postcode: "50000",
      contactPerson: "คุณราตรี",
      contactPersonPosition: "ฝ่ายขายโครงการ",
      mobilePhone: "0931592364",
      phone: "053304333",
      fax: "053305236",
      email: "",
      paymentType: "จ่ายเชื่อ",
      paymentCondition: "เครดิต 30 วัน",
      deliver: "ส่งถึงหน้างาน",
      notes: "",
      groupMat: [
        {
          groupname: "Concrete",
        },
        {
          groupname: "Steel",
        },
        {
          groupname: "Wood",
        },
        {
          groupname: "Electrical",
        },
        {
          groupname: "Sanitary",
        },
        {
          groupname: "Colour/Paint",
        },
        {
          groupname: "Tools",
        },
        {
          groupname: "ของแถม",
        },
        {
          groupname: "ไอเทมรวม",
        },
        {
          groupname: "ของใหม่",
        },
        {
          groupname: "ทดสอบ active ",
        },
      ],
    },
    {
      supplierName: "บจก. เชียงใหม่ วิทยาพาณิชย์ (1997)",
      supplierGroupName: "Colour/Paint",
      address: "90 ม.5",
      tumbon: "ไชยสถาน   ",
      amphur: "สารภี   ",
      province: "เชียงใหม่   ",
      postcode: "50000",
      contactPerson: "คุณดิ่ง",
      contactPersonPosition: "ฝ่ายขายโครงการ",
      mobilePhone: "085 6956694",
      phone: "053 850891 ",
      fax: "053 115719",
      email: "",
      paymentType: "จ่ายเชื่อ",
      paymentCondition: "เครดิต 30 วัน",
      deliver: "ส่งถึงหน้างาน",
      notes: "",
      groupMat: [
        {
          groupname: "Concrete",
        },
        {
          groupname: "Steel",
        },
        {
          groupname: "Wood",
        },
        {
          groupname: "Electrical",
        },
        {
          groupname: "Sanitary",
        },
        {
          groupname: "Colour/Paint",
        },
        {
          groupname: "Tools",
        },
        {
          groupname: "ของแถม",
        },
        {
          groupname: "ไอเทมรวม",
        },
        {
          groupname: "ของใหม่",
        },
        {
          groupname: "ทดสอบ active ",
        },
      ],
    },
    {
      supplierName: "บจก. เชียงใหม่ วิทยาพาณิชย์ (1997)",
      supplierGroupName: "Tools",
      address: "90 ม.5",
      tumbon: "ไชยสถาน   ",
      amphur: "สารภี   ",
      province: "เชียงใหม่   ",
      postcode: "50000",
      contactPerson: "คุณดิ่ง",
      contactPersonPosition: "ฝ่ายขายโครงการ",
      mobilePhone: "085 6956694",
      phone: "053 850891",
      fax: "053 115719,",
      email: "",
      paymentType: "จ่ายเชื่อ",
      paymentCondition: "เครดิต 30 วัน",
      deliver: "ส่งถึงหน้างาน",
      notes: "",
      groupMat: [
        {
          groupname: "Concrete",
        },
        {
          groupname: "Steel",
        },
        {
          groupname: "Wood",
        },
        {
          groupname: "Electrical",
        },
        {
          groupname: "Sanitary",
        },
        {
          groupname: "Colour/Paint",
        },
        {
          groupname: "Tools",
        },
        {
          groupname: "ของแถม",
        },
        {
          groupname: "ไอเทมรวม",
        },
        {
          groupname: "ของใหม่",
        },
        {
          groupname: "ทดสอบ active ",
        },
      ],
    },
    {
      supplierName: "บจก. เชียงใหม่ วิทยาพาณิชย์ (1997)",
      supplierGroupName: "ของแถม",
      address: "90 ม.5",
      tumbon: "ไชยสถาน   ",
      amphur: "สารภี   ",
      province: "เชียงใหม่   ",
      postcode: "50000",
      contactPerson: "คุณดิ่ง",
      contactPersonPosition: "ฝ่ายขายโครงการ",
      mobilePhone: "085 6956694",
      phone: "053 850891",
      fax: "053 115719",
      email: "",
      paymentType: "จ่ายเชื่อ",
      paymentCondition: "เครดิต 30 วัน",
      deliver: "ส่งถึงหน้างาน",
      notes: "",
      groupMat: [
        {
          groupname: "Concrete",
        },
        {
          groupname: "Steel",
        },
        {
          groupname: "Wood",
        },
        {
          groupname: "Electrical",
        },
        {
          groupname: "Sanitary",
        },
        {
          groupname: "Colour/Paint",
        },
        {
          groupname: "Tools",
        },
        {
          groupname: "ของแถม",
        },
        {
          groupname: "ไอเทมรวม",
        },
        {
          groupname: "ของใหม่",
        },
        {
          groupname: "ทดสอบ active ",
        },
      ],
    },
    {
      supplierName: "บจก. เชียงใหม่ วิทยาพาณิชย์ (1997)",
      supplierGroupName: "Tools",
      address: "90 ม.5",
      tumbon: "ไชยสถาน   ",
      amphur: "สารภี   ",
      province: "เชียงใหม่   ",
      postcode: "50000",
      contactPerson: "คุณดิ่ง",
      contactPersonPosition: "ฝ่ายขายโครงการ",
      mobilePhone: "085 6956694",
      phone: "053 850891 ",
      fax: "053 115719,",
      email: "",
      paymentType: "จ่ายเชื่อ",
      paymentCondition: "เครดิต 30 วัน",
      deliver: "ส่งถึงหน้างาน",
      notes: "",
      groupMat: [
        {
          groupname: "Concrete",
        },
        {
          groupname: "Steel",
        },
        {
          groupname: "Wood",
        },
        {
          groupname: "Electrical",
        },
        {
          groupname: "Sanitary",
        },
        {
          groupname: "Colour/Paint",
        },
        {
          groupname: "Tools",
        },
        {
          groupname: "ของแถม",
        },
        {
          groupname: "ไอเทมรวม",
        },
        {
          groupname: "ของใหม่",
        },
        {
          groupname: "ทดสอบ active ",
        },
      ],
    },
    {
      supplierName: "บจก. เชียงใหม่ วิทยาพาณิชย์ (1997)",
      supplierGroupName: "Tools",
      address: "90 ม.5",
      tumbon: "ไชยสถาน   ",
      amphur: "สารภี   ",
      province: "เชียงใหม่   ",
      postcode: "50000",
      contactPerson: "คุณดิ่ง",
      contactPersonPosition: "ฝ่ายขายโครงการ",
      mobilePhone: "085 6956694",
      phone: "053 850891",
      fax: "053 115719",
      email: "",
      paymentType: "จ่ายเชื่อ",
      paymentCondition: "เครดิต 30 วัน",
      deliver: "ส่งถึงหน้างาน",
      notes: "",
      groupMat: [
        {
          groupname: "Concrete",
        },
        {
          groupname: "Steel",
        },
        {
          groupname: "Wood",
        },
        {
          groupname: "Electrical",
        },
        {
          groupname: "Sanitary",
        },
        {
          groupname: "Colour/Paint",
        },
        {
          groupname: "Tools",
        },
        {
          groupname: "ของแถม",
        },
        {
          groupname: "ไอเทมรวม",
        },
        {
          groupname: "ของใหม่",
        },
        {
          groupname: "ทดสอบ active ",
        },
      ],
    },
  ];

  /////เปิดsidebar//////
  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  /////datatable///////
  onActivate(event) {
    // console.log('Activate Event', event.row);
  }
  onSelect({ selected }) {
    console.log("Select Event", selected, this.selected);

    this.selected.splice(0, this.selected.length);
    // this.selected.push(...selected);
  }
  rowclick(event, rowIndex) {
    // console.log("in",this.rowSelect)
    // console.log("rowindex",rowIndex)
    this.rowSelect = rowIndex;
    console.log("out", this.rowSelect);
    // console.log('rowclick Event', event);
  }

  dbclick(event) {
    // console.log("rowindex",rowIndex)
    console.log("event", event);
    // this.rowSelect=rowIndex;
    // console.log("out",this.rowSelect)
  }
  constructor(
    ///////ใช้sidebar////////
    private _coreSidebarService: CoreSidebarService
  ) {
    this._unsubscribeAll = new Subject();
  }

  createPage(event, rowIndex) {
    this.rowSelect = this.newData;
    // toggleSidebar('app-supplier-info');
  }

  ngOnInit(): void {
    ///////datatable//////
    this.kitchenSinkRows = this.rows;

    //////กำหนดnav////////
    this.contentHeader = {
      headerTitle: "การจัดการข้อมูลบริษัทคู่ค้า ",
      actionButton: false,
      breadcrumb: {
        type: "",
        links: [
          {
            name: "Supplier",
            isLink: true,
            link: "/supplier",
          },
        ],
      },
    };
  }



  //////getdatasource///

  

  //////OnDestroy////////
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
