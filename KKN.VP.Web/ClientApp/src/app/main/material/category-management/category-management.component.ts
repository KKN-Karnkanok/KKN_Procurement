import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  ColumnMode,
  DatatableComponent,
  SelectionType,
} from "@swimlane/ngx-datatable";
import { Subject } from "rxjs";
@Component({
  selector: "app-category-management",
  templateUrl: "./category-management.component.html",
  styleUrls: ["./category-management.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CategoryManagementComponent implements OnInit {
  public contentHeader: object;
  public headerTitle = "จัดการประเภทวัสดุ";
  private _unsubscribeAll: Subject<any>;
  private tempData = [];
  // Private
  //public rows: any;
  public selected = [];
  public ColumnMode = ColumnMode;
  public kitchenSinkRows: any;
  public basicSelectedOption: number = 10;
  public SelectionType = SelectionType;

  public rows = [
    
      { category_id: 1, group_name: "Concrete", category_name: "ปูนมิกซ์", active: 1 },
      { category_id: 2, group_name: "Concrete", category_name: "ปูนถง", active: 1 },
      { category_id: 3, group_name: "Concrete", category_name: "เคมีภัณฑ์", active: 2 },
      { category_id: 4, group_name: "Steel", category_name: "เหล็กเส้น", active: 1 },
      {
        category_id: 5,
        group_name: "Steel",
        category_name: "เหล็กรูปพรรณ",
        active: 2,
      },
      {
        category_id: 6,
        group_name: "Steel",
        category_name: "ตะแกรงเหล็ก",
        active: 1,
      },
      {
        category_id: 7,
        group_name: "Wood",
        category_name: "ไม้ห้องซาวน่า",
        active: 2,
      },
      {
        category_id: 8,
        group_name: "Electice",
        category_name: "สายไฟ/ระบบไฟฟ้า",
        active: 2,
      },
      {
        category_id: 9,
        group_name: "Electice",
        category_name: "อุปกรณ์ไฟฟ้า",
        active: 1,
      },
    
  ];

  @ViewChild(DatatableComponent) table: DatatableComponent;

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
  onSelect({ selected }) {
    console.log("Select Event", selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push();
  }

  onActivate(event) {
    console.log("Activate Event", event.row.id);
  }

  constructor(
    private _coreSidebarService: CoreSidebarService,
    private modalService: NgbModal
  ) {
    this._unsubscribeAll = new Subject();
  }

  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }
  singleClick(event) {
    console.log("--------- singleClick ------------- ", event);
  }

  checkactive(event) {
    console.log("checkbox target category !!!!!!", !event.target.checked);
  }

  modalOpenPrimary(modalPrimary) {
    this.modalService.open(modalPrimary, {
      centered: true,
      size:'lg',
      windowClass: "modal modal-primary",
    });
  }

  ngOnInit(): void {
    console.log("---------------category-management--------------------");
    this.kitchenSinkRows = this.rows;

    this.contentHeader = {
      headerTitle: "Category Manament",
      actionButton: false,
      breadcrumb: {
        type: "",
        links: [
          {
            name: "Material",
            isLink: true,
            link: "/material",
          },
          {
            name: "CategoryManament",
            isLink: false,
          },
        ],
      },
    };
  }
}
