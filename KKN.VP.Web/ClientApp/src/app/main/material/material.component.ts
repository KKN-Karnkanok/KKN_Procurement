import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";

import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import {
  ColumnMode,
  DatatableComponent,
  SelectionType,
} from "@swimlane/ngx-datatable";
import internal from "assert";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

interface item {
  item_id: any;
  item_no: any;
  item_name: any;
  group_id: any;
  category_id: any;
  description: any;
  material_acc_id: any;
  costing_method_id: any;
  stock_count: any;

  overdraw_stock: any;
  brand: any;
  version: any;
  color: any;
  size: any;
  uom_in: any;
  qty_in: any;
  uom_stock: any;
  qty_stock: any;
  updatedate: any;
  active: any;
  expiry: any;
}
interface group {
  group_id: number;
  group_name: string;
  active: boolean;
}
interface category {
  category_id: number;
  category_name: string;
  group_id: number;
  active: boolean;
}
@Component({
  selector: "app-material",
  templateUrl: "./material.component.html",
  styleUrls: ["./material.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class MaterialComponent implements OnInit,OnDestroy {

  templateID = 0;

  public selected = [];
  public ColumnMode = ColumnMode;
  public kitchenSinkRows: any;
  public basicSelectedOption: number = 10;
  public SelectionType = SelectionType;
  private tempData = [];


  @ViewChild(DatatableComponent) table: DatatableComponent;
  
  public apiData;
  public urlLastValue;
  public url = this.router.url;  
  public sidebarToggleRef = false;
  
  public paymentSidebarToggle = false;

  coreConfig: any;
  public rows: any;

  public pageBasicText;

  // public itemList: {
  //   item_id: number;
  //   item_name: string;
  //   group_id: number;
  //   category: number;
  // }[] = dateitem;

  itemlist: item[] = [
    {
      item_id: 5,
      item_no: "a001",
      item_name: "ปูนSCG1111",
      group_id: "Concrete",
      category_id: "ปูนผง",
      description: "testcomplet",
      material_acc_id: 5,
      costing_method_id: 2,
      stock_count: false,
      overdraw_stock: false,
      brand: "SCG",
      version: "ปูนซีเมนต์ปอร์ตแลนด์ชนิดแข็งตัวเร็ว",
      color: "เหลือง",
      size: "20*20 cm 1",
      uom_in: 5,
      qty_in: 12475.12,
      uom_stock: 1,
      qty_stock: 1.0,
      updatedate: "2021-08-31T17:44:59.913",
      active: false,
      expiry: "2021-09-29T00:00:00"
    },
    {
      item_id: 6,
      item_no: "a005",
      item_name: "ปูนดอกบัว",
      group_id: "Wood",
      category_id: "ท่อPVC",
      description: "testcomplet",
      material_acc_id: 4,
      costing_method_id: 2,
      stock_count: true,
      overdraw_stock: true,
      brand: "ดอกบัว",
      version: "ปูนซีเมนต์ปอร์ตแลนด์ธรรมดา",
      color: "เขียว",
      size: "30*30 cm",
      uom_in: 5,
      qty_in: 1.0,
      uom_stock: 5,
      qty_stock: 1.0,
      updatedate: "2021-08-31T14:00:48.920",
      active: true,
      expiry: "2021-09-30T00:00:00"
    },
    {
      item_id: 7,
      item_no: "a005",
      item_name: "ปูนดอกบัว",
      group_id: "Electrical",
      category_id: "ตะแกรงเหล็ก",
      description: "testcomplet",
      material_acc_id: 4,
      costing_method_id: 2,
      stock_count: true,
      overdraw_stock: true,
      brand: "ดอกบัว",
      version: "ปูนซีเมนต์ปอร์ตแลนด์ธรรมดา",
      color: "เขียว",
      size: "30*30 cm",
      uom_in: 5,
      qty_in: 1.0,
      uom_stock: 5,
      qty_stock: 1.0,
      updatedate: "2021-08-31T14:00:48.920",
      active: true,
      expiry: "2021-09-30T00:00:00"
    },
  ];

  grouplist: group[] = [
    { group_id: 1, group_name: "Concrete", active: true },
    { group_id: 2, group_name: "Steel", active: true },
    { group_id: 3, group_name: "Wood", active: true },
    { group_id: 4, group_name: "Electrical", active: true },
    { group_id: 5, group_name: "Sanitary", active: true },
    { group_id: 6, group_name: "Colour/Paint", active: true },
    { group_id: 7, group_name: "Tools", active: true },
    { group_id: 8, group_name: "ของแถม", active: true },
    { group_id: 9, group_name: "ไอเทมรวม", active: true },
    { group_id: 18, group_name: "ของใหม่", active: true },
  ];

  categorylist: category[] = [
    {
      category_id: 1,
      group_id: 1,
      category_name: "ปูนมิกซ์",
      active: true,
    },
    { category_id: 2, group_id: 1, category_name: "ปูนถง", active: true },
    {
      category_id: 3,
      group_id: 1,
      category_name: "เคมีภัณฑ์",
      active: true,
    },
    {
      category_id: 4,
      group_id: 2,
      category_name: "เหล็กเส้น",
      active: true,
    },
    {
      category_id: 5,
      group_id: 2,
      category_name: "เหล็กรูปพรรณ",
      active: true,
    },
    {
      category_id: 6,
      group_id: 2,
      category_name: "ตะแกรงเหล็ก",
      active: true,
    },
    {
      category_id: 7,
      group_id: 3,
      category_name: "ไม้ห้องซาวน่า",
      active: true,
    },
    {
      category_id: 8,
      group_id: 4,
      category_name: "สายไฟ/ระบบไฟฟ้า",
      active: true,
    },
    {
      category_id: 9,
      group_id: 4,
      category_name: "อุปกรณ์ไฟฟ้า",
      active: true,
    },
    {
      category_id: 10,
      group_id: 4,
      category_name: "ดวงโคม / หลอดไฟ",
      active: true,
    },
    {
      category_id: 11,
      group_id: 5,
      category_name: "สุขภัณฑ์",
      active: true,
    },
    {
      category_id: 12,
      group_id: 5,
      category_name: "ท่อPVC",
      active: true,
    },
    {
      category_id: 13,
      group_id: 6,
      category_name: "ถังสี",
      active: true,
    },
    {
      category_id: 14,
      group_id: 6,
      category_name: "อุปกรณ์ทาสี",
      active: true,
    },
    {
      category_id: 15,
      group_id: 7,
      category_name: "เครื่องมือช่าง",
      active: true,
    },
    {
      category_id: 16,
      group_id: 7,
      category_name: "อุปกรณ์สำรวจ",
      active: true,
    },
  ];

  // private
  private _unsubscribeAll: Subject<any>;

  constructor(
    private router: Router,
    private _coreSidebarService: CoreSidebarService,
  ) {
    this._unsubscribeAll = new Subject();
    this.urlLastValue = this.url.substr(this.url.lastIndexOf("/") + 1);
  }
  singleClick(event) {
    console.log("--------- singleClick ------------- ", event);
  }
  onSelect({ selected }) {
    console.log("Select Event", selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push();
  }

  onActivate(event) {
    console.log("Activate Event", event.row.id);
  }
  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.full_name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    // this.kitchenSinkRows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  public contentHeader: object;
  ngOnInit() {

    
    this.kitchenSinkRows = this.itemlist;

    console.log(" material  --------ngonit");
    //   this._datatablesService.onDatatablessChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
    //   this.rows = response;
    //   this.tempData = this.rows;
    // }),
    this.contentHeader = {
      headerTitle: "Material",
      actionButton: false,
      breadcrumb: {
        type: "",
        links: [
          {
            name: "Material",
            isLink: true,
            link: "/material",
          },
        ],
      },
    };
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
