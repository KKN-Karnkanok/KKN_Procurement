import { Component, OnInit, Inject, ViewEncapsulation, Output, Input } from "@angular/core";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import * as _ from 'lodash';


import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
@Component({
  selector: "app-supplier-info",
  templateUrl: "./supplier-info.component.html",
  styleUrls: ["./supplier-info.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class SupplierInfoComponent implements OnInit {
  headerTitle = "ข้อมูลบริษัทคู่ค้า";

  @Input() inputData: any;


  // @Output() outputData: any;

  // public supplierName;
  // public supplierGroupName;
  // public address;
  // public tumbon;
  // public amphur;
  // public province;
  // public postcode;
  // public contactPerson;
  // public contactPersonPosition;
  // public mobilePhone;
  // public phone;
  // public fax;
  // public email;
  // public paymentType;
  // public paymentCondition;
  // public deliver;
  // public notes;
  // public groupMat;

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
  public selectprovice = [
    { province: "นครราชสีมา" },
    { province: "เชียงใหม่" },
    { province: "กาญจนบุรี" },
    { province: "ตาก" },
    { province: "อุบลราชธานี" },
    { province: "สุราษฎร์ธานี" },
    { province: "ชัยภูมิ" },
    { province: "แม่ฮ่องสอน" },
    { province: "เพชรบูรณ์" },
    { province: "ลำปาง" },
    { province: "อุดรธานี" },
    { province: "เชียงราย" },
  ];

  public selectamphur = [
    { amphur: "ก่อไฟ" },
    { amphur: "ไม้ไผ่" },
    { amphur: "สารภี" },
    { amphur: "สันทราย" },
    { amphur: "ผีเสื้อ" },
  ];
  public selecttumbon = [
    { tumbon: "ในเวียง" },
    { tumbon: "ในป่า" },
    { tumbon: "หน้ามอ" },
    { tumbon: "ก่อไฟ" },
  ];
  public selectpaymentType = [
    { paymentType: "สินเชื่อ" },
    { paymentType: "เงินสด" },
    { paymentType: "เครดิต" },
  ];



  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  // closeSidebar(){
  //   toggleSidebar('app-supplier-info')
  // };

  constructor(
    ///////ใช้sidebar////////
    private _coreSidebarService: CoreSidebarService
  ) { }

  ngOnInit(): void {
    console.log("info")
    // console.log("------------------inputdata form row-------------",this.inputData);
    // this.outputData = _.cloneDeep(this.inputData);
  }
}
