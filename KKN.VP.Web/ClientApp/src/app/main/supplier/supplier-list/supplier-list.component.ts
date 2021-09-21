import {
  Component,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from "@angular/core";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { ColumnMode, SelectionType } from "@swimlane/ngx-datatable";
import { Subject, Subscription } from "rxjs";
import { SupplierService } from "../supplier.service";
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

  //////getdatasource
  sub: Subscription[] = [];

  public dataGetSupList = [];
  public dataGetMatGroupList = [];

  public supplierRows: any;
  public selectorMaterialGroupRows: any;
  ///////
  newData = {
    SupplierId: -1,
    SupplierName: "",
    // supplierGroupName: "",
    // address:  "",
    // tumbon:  "",
    // amphur:  "",
    // province:  "",
    PostCode: "",
    ContactPerson: "",
    ContactPersonPosition: "",
    MobilePhone: "",
    Phone: "",
    Fax: "",
    Email: "",
    // paymentType: "",
    PaymentCondition: "",
    Deliver: "",
    Notes: "",
  };

  
  //////////////////

  rowSelect = this.newData;
  // rowSelect= Object;


  ///////////datatable///////////
  public selected = [];
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
    }
  ];

  /////เปิดsidebar//////
  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  };

  /////datatable///////
  onActivate(event) {
    // console.log('Activate Event', event.row);
  };

  onSelect({ selected }) {
    console.log("Select Event", selected, this.selected);
    this.selected.splice(0, this.selected.length);
  };

  rowclick(event, rowIndex) {
    // console.log("in",this.rowSelect)
    // console.log("rowindex",rowIndex)
    this.rowSelect = rowIndex;
    console.log("out", this.rowSelect);
    // console.log('rowclick Event', event);
  };

  dbclick(event) {
    // console.log("rowindex",rowIndex)
    console.log("event", event);
    // this.rowSelect=rowIndex;
    // console.log("out",this.rowSelect)
  };

  constructor(
    ///////ใช้sidebar////////
    private _coreSidebarService: CoreSidebarService,
    //////service/
    private supplierService: SupplierService,
  ) {
    this._unsubscribeAll = new Subject();
  }

  createPage(event, rowIndex) {
    this.rowSelect = this.newData;
    console.log("rowSelet---createpage---", this.rowSelect)
    // toggleSidebar('app-supplier-info');
  };



  ngOnInit(): void {
    console.log('--ngOnInit ngOnInitngOnInit----')
    ///////datatable//////
    console.log('--ngOnInit in s----')
    this.getDatasource();
    console.log('--ngOnInit out s----')
    // this.kitchenSinkRows = this.rows;
    console.log('--row----', this.rows)
    // console.log('--datagetsuplist----',this.datagetsuplist)

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
  getDatasource() {
    console.log("---getdatasource");
    this.sub.push(this.supplierService.getSupplierList()
      .subscribe((result) => {
        console.log("--getDatasource result supplierList", result.supplierList);
        this.dataGetSupList = result.supplierList;
        console.log("--getDatasource result materialGroupList", result.materialGroupList);
        this.dataGetMatGroupList = result.materialGroupList;

        console.log("datagetsuplist", this.dataGetSupList)
        this.supplierRows = this.dataGetSupList;
        this.selectorMaterialGroupRows = this.dataGetMatGroupList;
      }
      )
    )
  };

  //////OnDestroy////////
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
