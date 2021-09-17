import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, NgForm, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes, Resolve } from "@angular/router";
import { NgxMaskModule } from "ngx-mask";
import { NgSelectModule } from "@ng-select/ng-select";
import { CoreSidebarModule } from "@core/components";
import { CoreCommonModule } from "@core/common.module";
import { ContentHeaderModule } from "app/layout/components/content-header/content-header.module";
import { CoreDirectivesModule } from "@core/directives/directives";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { Ng2FlatpickrModule } from "ng2-flatpickr";
import { FileUploadModule } from "ng2-file-upload";
import { CorePipesModule } from "@core/pipes/pipes.module";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";

////////Component/////////
import { SupplierComponent } from "./supplier.component";
import { SupplierListComponent } from "./supplier-list/supplier-list.component";
import { SupplierInfoComponent } from "./supplier-info/supplier-info.component";

const routes: Routes = [
  {
    path: "supplier",
    component: SupplierComponent,
    data: { animation: "home" },
  },
  {
    path: "supplier/supplier-list",
    component: SupplierListComponent,
    data: { animation: "wizard" },
  },
  {
    path: "supplier/supplier-info",
    component: SupplierInfoComponent,
    data: { animation: "home" },
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ContentHeaderModule,
    CoreCommonModule,
    CommonModule,
    FormsModule,
    NgxDatatableModule,
    NgbModule,
    NgSelectModule,
    CoreDirectivesModule,
    FileUploadModule,
    CoreSidebarModule,
    CorePipesModule,
    Ng2FlatpickrModule,
    SweetAlert2Module.forRoot(),
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    // NgForm,
  ],
  declarations: [
    SupplierComponent,
    SupplierListComponent,
    SupplierInfoComponent,
  ],
  exports: [SupplierComponent, SupplierListComponent, SupplierInfoComponent],
})
export class SupplierModule {}
