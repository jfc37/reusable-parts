import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchCompaniesEntityComponent } from './search-companies-entity/search-companies-entity.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { NzBusinessApiModule } from '@reusable-parts/nz-business-api';
import { CommonUiComponentsModule } from '@reusable-parts/common-ui-components/src';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // angular material components
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,

    CommonUiComponentsModule,

    NzBusinessApiModule,
  ],
  declarations: [SearchCompaniesEntityComponent],
  exports: [SearchCompaniesEntityComponent],
})
export class SearchCompaniesEntityModule {}
