import { Component, OnInit, Inject, ViewEncapsulation, Output, Input } from "@angular/core";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import * as _ from 'lodash';
import { BeforeOpenEvent } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { SupplierService } from "../supplier.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MustMatch } from "_helpers/must-match.validator";
@Component({
  selector: "app-supplier-info",
  templateUrl: "./supplier-info.component.html",
  styleUrls: ["./supplier-info.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class SupplierInfoComponent implements OnInit {
  headerTitle = "ข้อมูลบริษัทคู่ค้า";

  @Input() inputData: any;
  @Input() inputDataMatGroup: any;
  ////////form validdate///////
  public ReactiveUserDetailsForm: FormGroup;
  public ReactiveUDFormSubmitted = false;

  // Reactive User Details form data
  public UDForm = {
    SupplierName: '',
    SupplierGroupName: '',
    Address: '',
    Province: '',
    Amphur: '',
    Tumbon: '',
    PostCode: '',
    ContactPerson: '',
    ContactPersonPosition: '',
    MobilePhone: '',
    Phone: '',
    Fax: '',
    Email: '',
    PaymentType: '',
    PaymentCondition: '',
    Deliver: '',
    Notes: ''
  };

  // (click)='saveSupplier()'

  ReactiveUDFormOnSubmit() {
    this.ReactiveUDFormSubmitted = true;

    // stop here if form is invalid
    if (this.ReactiveUserDetailsForm.invalid) {
      console.log('return');
      return;
    }
    console.log(this.ReactiveUserDetailsForm.value);
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.ReactiveUserDetailsForm.value));
    this.saveSupplier();
  }

   // getter for easy access to form fields
   get ReactiveUDForm() {
    return this.ReactiveUserDetailsForm.controls;
  }
  //////////////////////////



  sub: Subscription[] = [];

  public dataGetSupplierGroup = [];
  public selectorSupplierGroupRows: any;

  public selectprovice = [];
  public selectamphur = [];
  public selecttumbon = [];

  public selectpaymentType = [
    { PaymentType: "เงินสด" },
    { PaymentType: "จ่ายเชื่อ" },
    { PaymentType: "จ่ายสด" },
  ];

  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }


  saveSupplier() {
    console.log('-----save info supplier----', this.inputData);
    this.sub.push(this.supplierService.saveSupplier(
      { SupplierList: this.inputData }
    )
      .subscribe((result) => {
        console.log('save subscribe', result)
        console.log('save subscribe result---', result.response.Response.IsSuccess)

      }))
  };

  constructor(
    ///////ใช้sidebar////////
    private _coreSidebarService: CoreSidebarService,
    //////service/
    private supplierService: SupplierService,
    /////////////formBuilder///////////////////
    private formBuilder: FormBuilder,
  ) { }

 

  ngOnInit(): void {
    console.log("info")
    // console.log("------------------inputdata form row-------------",this.inputData);
    // this.outputData = _.cloneDeep(this.inputData);
    this.sub.push(this.supplierService.getSupplierGroupList()
      .subscribe((result) => {
        console.log('--ngOnInit getSupplierGroupList  result', result.supplierGroupList);
        this.dataGetSupplierGroup = result.supplierGroupList;
        this.selectorSupplierGroupRows = this.dataGetSupplierGroup;
      }));

    // Reactive form initialization
    this.ReactiveUserDetailsForm = this.formBuilder.group(
      {
        SupplierName              : ['', [Validators.required, Validators.minLength(3)]],
        SupplierGroupName         : ['', Validators.required],
        Province                  : ['', [Validators.required]],
        Amphur                    : ['', [Validators.required]],
        Tumbon                    : ['', [Validators.required]],
        PostCode                  : ['', Validators.required],
        ContactPerson             : ['', Validators.required],
        ContactPersonPosition     : ['', Validators.required],
        MobilePhone               : ['', Validators.required],
        Phone                     : ['', Validators.required],
        Fax                       : ['', Validators.required],
        Email                     : ['', [Validators.required, Validators.email]],
        // PaymentType               : ['', [Validators.required]],
        // PaymentCondition          : ['', Validators.required],
        // Deliver                   : ['', Validators.required]
      },
      {
        // validator: MustMatch('password', 'confPassword')
      }
    );
  };
}
