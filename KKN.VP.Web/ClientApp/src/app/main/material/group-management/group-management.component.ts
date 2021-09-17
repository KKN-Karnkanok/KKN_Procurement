import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import {
  ColumnMode,
  DatatableComponent,
  SelectionType,
} from "@swimlane/ngx-datatable";
import { Subject } from "rxjs";


encapsulation: ViewEncapsulation.None
@Component({
  selector: "app-group-management",
  templateUrl: "./group-management.component.html",
  styleUrls: ["./group-management.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class GroupManagementComponent implements OnInit {
private   modalRef :any;

  public contentHeader: object;
  public headerTitle =  "จัดการกลุ่มวัสดุ";

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
    {
      groupcode: "CC",
      groupname: "congert",
      active: 1,
    },
    {
      groupcode: "ce",
      groupname: "ab",
      active: 1,
    },
    {
      groupcode: "cf",
      groupname: "jkj",
      active: 1,
    },
    {
      groupcode: "Ct",
      groupname: "ti",
      active: 1,
    },
    {
      groupcode: "Cp",
      groupname: "cong44",
      active: 1,
    }, {
      groupcode: "Cp",
      groupname: "csdfert",
      active: 1,
    }, {
      groupcode: "Cp",
      groupname: "congrt",
      active: 1,
    }, {
      groupcode: "Cp",
      groupname: "conert",
      active: 2,
    }, {
      groupcode: "Cp",
      groupname: "t",
      active: 2,
    }, {
      groupcode: "Cp",
      groupname: "yiert",
      active: 2,
    }, {
      groupcode: "Cp",
      groupname: "cont",
      active: 2,
    },
  ];

  @ViewChild(DatatableComponent) table: DatatableComponent;
  

  /**
   * Method Search (filter)
   *
   * @param event
   */
  filterUpdate(event) {
    const val = event.target.value.toLowerCase();
console.log(val)
    // filter our data
    const temp = this.tempData.filter(function (d) {
      console.log("d data",d);
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

  constructor(private _coreSidebarService: CoreSidebarService,private modalService: NgbModal) {
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
    windowClass: 'modal modal-success'
  });
  }
  
  // modal Open Danger
  modalOpenDanger(modalDanger) {
  this.modalService.open(modalDanger, {
    centered: true,
    windowClass: 'modal modal-danger'
  });
  }
  
  // modal Open Info
  modalOpenInfo(modalInfo) {
  this.modalService.open(modalInfo, {
    centered: true,
    windowClass: 'modal modal-info'
  });
  }
  
  // modal Open Warning
  modalOpenWarning(modalWarning) {
  this.modalService.open(modalWarning, {
    centered: true,
    windowClass: 'modal modal-warning'
  });
  }
  
  // modal Open Dark
  modalOpenDark(modalDark) {
  this.modalService.open(modalDark, {
    centered: true,
    windowClass: 'modal modal-dark'
  });
  }
  
  modalOpenPrimary(modalPrimary) {
    this.modalRef = this.modalService.open(modalPrimary, {
      centered: true,
      size:'lg',
      windowClass: 'modal modal-primary'
    });
    this.modalRef.closed.subscribe((data:any)=>{console.log("--result-data--",data)})

  }
  
  saveClick(){
    this.modalRef.close();

    
  }

  ngOnInit() {
    console.log("---------------group-management--------------------");
    

    this.kitchenSinkRows = this.rows;

    this.contentHeader = {
      headerTitle: "Group Manament",
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
