import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes,Resolve } from "@angular/router";

import { NgSelectModule } from "@ng-select/ng-select";
import { CoreSidebarModule } from '@core/components';
import { CoreCommonModule } from "@core/common.module";
import { ContentHeaderModule } from "app/layout/components/content-header/content-header.module";
import { CardSnippetModule } from "@core/components/card-snippet/card-snippet.module";
import { CoreDirectivesModule } from "@core/directives/directives";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { DatatablesService } from "./datatables.service";
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
////////Component/////////
import { MaterialComponent } from "./material.component";
import { GroupManagementComponent } from "./group-management/group-management.component";
import { CategoryManagementComponent } from "./category-management/category-management.component";
import { CreateMaterialComponent } from "./create-material/create-material.component";
import { CreateGroupComponent } from "./group-management/create-group/create-group.component";
import { CreateCategoryComponent } from "./category-management/create-category/create-category.component";
import { FileUploadModule } from "ng2-file-upload";
import { CorePipesModule } from "@core/pipes/pipes.module";
////////Component/////////

const routes: Routes = [
  {
    path: "material",
    component: MaterialComponent,
    data: { animation: "home" },
  },
  {
    path: "material/create-material",
    component: CreateMaterialComponent,
    data: { animation: 'wizard' }
  },
  {
    path: "material/group-management",
    component: GroupManagementComponent,
    data: { animation: "home" },
  },
  {
    path: "material/group-management/create-group",
    component: CreateGroupComponent,
    data: { animation: "home" },
  },
  {
    path: "material/category-management",
    component: CategoryManagementComponent,
    data: { animation: "home" },
  },
  {
    path: "material/category-management/create-category",
    component: CreateCategoryComponent,
    data: { animation: "home" },
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ContentHeaderModule,
    TranslateModule,
    CoreCommonModule,
    CommonModule,
    CardSnippetModule,
    FormsModule,
    NgxDatatableModule,
    NgbModule,
    NgSelectModule,
    CoreDirectivesModule,
    FileUploadModule,
    CoreSidebarModule,
    CorePipesModule,
    Ng2FlatpickrModule,
    

  ],
  declarations: [
    MaterialComponent,
    GroupManagementComponent,
    CategoryManagementComponent,
    CreateMaterialComponent,
    CreateGroupComponent,
    CreateCategoryComponent,
  ],
  exports: [
    MaterialComponent,
    GroupManagementComponent,
    CategoryManagementComponent,
    CreateMaterialComponent,
    CreateGroupComponent,
    CreateCategoryComponent,
  ],
  providers: [DatatablesService],
})
export class MaterialModule {}
