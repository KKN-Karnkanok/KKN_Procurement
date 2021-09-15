import { HttpClient } from "@angular/common/http";
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import {
  NgbDateStruct,
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
  NgbTimeStruct,
} from "@ng-bootstrap/ng-bootstrap";

import Stepper from "bs-stepper";
import { Console } from "console";
import { FileUploader } from "ng2-file-upload";
import { FlatpickrOptions } from "ng2-flatpickr";
import Swal from "sweetalert2";
const URL = "https://your-url.com";
interface item {
  item_id: number;
  item_name: string;
  group_id: number;
  category_id: number;
}

@Component({
  selector: "app-create-material",
  templateUrl: "./create-material.component.html",
  styleUrls: ["./create-material.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateMaterialComponent implements OnInit {
  // public
  public basicDPdata: NgbDateStruct;
  public customDateOptions: FlatpickrOptions = {
    altFormat: 'j-m-Y',
    altInput: true
  }
  
  public materials = [
    {
      item_id: "",
      item_no: "",
      item_name: "",
      group_id: "",
      category_id: "",
      description: "",
      material_acc_id: "",
      costing_method_id: "",
      stock_count: "",
      overdraw_stock: "",
      brand: "",
      version: "",
      color: "",
      size: "",
      uom_in: "",
      qty_in: "",
      uom_stock: "",
      qty_stock: "",
      expiry: "",
      active: "",
    },
  ];

  public material = {
    item_id: 5,
    item_no: "a001",
    item_name: "ปูนSCG1111",
    group_id: 1,
    category_id: 1,
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
    expiry: "2021-09-29T00:00:00",
    active: false,
  };

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Add Item
   */
  // addItem() {

  //   // this.material.expiry = this.basicDPdata;
  //   this.materials.push({
  //     item_id: 'sss',
  //     item_no: '',
  //     item_name: '',
  //     group_id: '',
  //     category_id: '',
  //     description: '',
  //     material_acc_id: '',
  //     costing_method_id: '',
  //     stock_count: '',
  //     overdraw_stock: '',
  //     brand: '',
  //     version: '',
  //     color: '',
  //     size: '',
  //     uom_in: '',
  //     qty_in: '',
  //     uom_stock: '',
  //     qty_stock: '',
  //     expiry: '',
  //     active:'',
  //   });

  //   console.log(this.materials)
  // }

  /**
   * DeleteItem
   *
   * @param id
   */
  // deleteItem(id) {
  //   for (let i = 0; i < this.materials.length; i++) {
  //     if (this.materials.indexOf(this.materials[i]) === id) {
  //       this.materials.splice(i, 1);
  //       break;
  //     }
  //   }
  // }

  itemlist: item[] = [
    { item_id: 5, item_name: "ปูนSCG1111", group_id: 1, category_id: 1 },
  ];

  imageDeleteFrom: FormGroup;
  imageurls = [];
  base64String: string;
  myForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(3)]),
    file: new FormControl("", [Validators.required]),
    fileSource: new FormControl("", [Validators.required]),
  });

  ConfirmColorOpen() {
    Swal.fire({
      title: "คุณต้องการเพิ่มวัสดุใหม่หรือไม่",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ใช่",
      cancelButtonText: "ไม่",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-danger ml-1",
      },
    }).then(function (result) {
      if (result.value) {
        console.log("1111111")
        Swal.fire({
          title: "เพิ่มวัสดุ!",
          text: "เพิ่มวัสดุสำเร็จ",
          icon: "success",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "ยกเลืก",
          text: "คุณได้ยกเลิกบันทึกข้อมูล",
          icon: "error",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      }
    });
  }

  imagePath: string;

  dataimg = [];

  removeImageEdit(i, imagepath) {
    this.imageDeleteFrom.value.id = i;
    this.imageDeleteFrom.value.ImagePath = imagepath;
  }

  removeImage(i) {
    this.imageurls.splice(i, 1);
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files);

      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onload = (event: any) => {
          this.imageurls.push(reader.result);
          this.myForm.patchValue({
            fileSource: this.imageurls,
          });

          console.log("================================", reader.result);
        };

        this.dataimg.push({ name: event.target.files[i].name });
      }
    }
    this.urllog();
  }
  urllog() {
    console.log("11111111imageurls111111");
    console.log(this.imageurls);
    console.log("11111111dataimg111111");
    console.log(this.dataimg);
    console.log("1111111myForm1111111");
    // console.log(this.myForm.value)
    // console.log(this.myForm.value.fileSource[1].base64String)
  }
  ttttt = [this.imageurls, this.dataimg];

  images = [];
  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.images.push(event.target.result);
          this.myForm.patchValue({
            fileSource: this.images,
          });
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  // public
  public contentHeader: object;
  public TDNameVar;
  public TDEmailVar;
  public TDFirstNameVar;
  public TDLastNameVar;
  public twitterVar;
  public facebookVar;
  public googleVar;
  public linkedinVar;
  public landmarkVar;
  public addressVar;

  public hasAnotherDropZoneOver: boolean = false;
  public hasBaseDropZoneOver: boolean = false;
  public uploader: FileUploader = new FileUploader({
    url: URL,
    isHTML5: true,
  });

  public selectBasic = [
    { name: "UK" },
    { name: "USA" },
    { name: "Spain" },
    { name: "France" },
    { name: "Italy" },
    { name: "Australia" },
  ];

  public selectMulti = [
    { name: "English" },
    { name: "French" },
    { name: "Spanish" },
  ];
  public selectMultiSelected;

  // private
  private horizontalWizardStepper: Stepper;
  private verticalWizardStepper: Stepper;
  private modernWizardStepper: Stepper;
  private modernVerticalWizardStepper: Stepper;
  private bsStepper;

  /**
   * Horizontal Wizard Stepper Next
   *
   * @param data
   */
  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  horizontalWizardStepperNext(data) {
    if (data.form.valid === true) {
      this.horizontalWizardStepper.next();
    }
  }
  /**
   * Horizontal Wizard Stepper Previous
   */
  horizontalWizardStepperPrevious() {
    this.horizontalWizardStepper.previous();
  }

  /**
   * Vertical Wizard Stepper Next
   */
  verticalWizardNext() {
    this.verticalWizardStepper.next();
  }
  /**
   * Vertical Wizard Stepper Previous
   */
  verticalWizardPrevious() {
    this.verticalWizardStepper.previous();
  }
  /**
   * Modern Horizontal Wizard Stepper Next
   */
  modernHorizontalNext() {
    this.modernWizardStepper.next();
  }
  /**
   * Modern Horizontal Wizard Stepper Previous
   */
  modernHorizontalPrevious() {
    this.modernWizardStepper.previous();
  }
  /**
   * Modern Vertical Wizard Stepper Next
   */
  modernVerticalNext() {
    this.modernVerticalWizardStepper.next();
  }
  /**
   * Modern Vertical Wizard Stepper Previous
   */
  modernVerticalPrevious() {
    this.modernVerticalWizardStepper.previous();
  }

  /**
   * On Submit
   */
  onSubmit() {
    alert("Submitted!!");
    return false;
  }

  constructor(
    private http: HttpClient,
    private _coreSidebarService: CoreSidebarService
  ) {}

  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  ngOnInit() {
    console.log(" create  --------ngonit");

    // this.verticalWizardStepper = new Stepper(document.querySelector('#stepper2'), {
    //   linear: false,
    //   animation: true
    // });

    // this.bsStepper = document.querySelectorAll('.bs-stepper');

    // content header
    this.contentHeader = {
      // headerTitle: "Create Material",
      headerTitle: "วัสดุ",
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
            name: "CreateMaterial",
            isLink: false,
          },
          {
            name: "Back",
            isLink: true,
            link: "/material",
          },
        ],
      },
    };
  }
}
