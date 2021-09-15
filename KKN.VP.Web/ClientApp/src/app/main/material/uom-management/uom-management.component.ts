import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  ColumnMode,
  DatatableComponent,
  SelectionType,
} from "@swimlane/ngx-datatable";
import { Subject } from "rxjs";

encapsulation: ViewEncapsulation.None;
@Component({
  selector: "app-uom-management",
  templateUrl: "./uom-management.component.html",
  styleUrls: ["./uom-management.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class UomManagementComponent implements OnInit {
  public contentHeader: object;
  // public headerTitle = "Uom Manament";
  public headerTitle = "จัดการหน่วยวัสดุ";

  private _unsubscribeAll: Subject<any>;
  private tempData = [];
  rowSelected: any;
  // Private
  //public rows: any;
  public selected = [];
  public ColumnMode = ColumnMode;
  public kitchenSinkRows: any;
  public basicSelectedOption: number = 10;
  public SelectionType = SelectionType;

  public rows = [
    { uom_id: 1, uom_name: "ลัง", active: 1 },
    { uom_id: 2, uom_name: "กล่อง", active: 1 },
    { uom_id: 3, uom_name: "ชิ้น", active: 2 },
    { uom_id: 4, uom_name: "คัน", active: 2 },
    { uom_id: 5, uom_name: "เครื่อง", active: 2 },
    { uom_id: 6, uom_name: "เมตร", active: 2 },
    { uom_id: 7, uom_name: "เล่ม", active: 1 },
    { uom_id: 8, uom_name: "เส้น", active: 1 },
    { uom_id: 9, uom_name: "แท่ง", active: 1 },
    { uom_id: 10, uom_name: "แผ่น", active: 1 },
    { uom_id: 11, uom_name: "ใบ", active: 1 },
    { uom_id: 12, uom_name: "ถุง", active: 1 },
  ];

  @ViewChild(DatatableComponent) table: DatatableComponent;

  /**
   * Method Search (filter)
   *
   * @param event
   */
  filterUpdate(event) {
    const val = event.target.value.toLowerCase();
    // console.log(val)
    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.full_name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.kitchenSinkRows = temp;
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
  checkactive(event) {
    console.log("checkbox target group !!!!!!", !event.target.checked);
  }

  constructor(
    private _coreSidebarService: CoreSidebarService,
    private modalService: NgbModal
  ) {
    this._unsubscribeAll = new Subject();
  }

  singleClick(event) {
    console.log("--------- singleClick ------------- ", event);
  }

  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  // modal Open Success
  modalOpenSuccess(modalSuccess) {
    this.modalService.open(modalSuccess, {
      centered: true,
      windowClass: "modal modal-success",
    });
  }

  // modal Open Danger
  modalOpenDanger(modalDanger) {
    this.modalService.open(modalDanger, {
      centered: true,
      windowClass: "modal modal-danger",
    });
  }

  // modal Open Info
  modalOpenInfo(modalInfo) {
    this.modalService.open(modalInfo, {
      centered: true,
      windowClass: "modal modal-info",
    });
  }

  // modal Open Warning
  modalOpenWarning(modalWarning) {
    this.modalService.open(modalWarning, {
      centered: true,
      windowClass: "modal modal-warning",
    });
  }

  // modal Open Dark
  modalOpenDark(modalDark) {
    this.modalService.open(modalDark, {
      centered: true,
      windowClass: "modal modal-dark",
    });
  }

  modalOpenPrimary(modalPrimary) {
    this.modalService.open(modalPrimary, {
      centered: true,
      size: "lg",
      windowClass: "modal modal-primary",
    });
  }

  ngOnInit() {
    console.log("---------------group-management--------------------");

    this.kitchenSinkRows = this.rows;

    this.contentHeader = {
      headerTitle: "Uom Manament",
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
            name: "GroupManament",
            isLink: false,
          },
        ],
      },
    };
  }
}
