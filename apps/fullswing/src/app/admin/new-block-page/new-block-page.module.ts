import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewBlockPageComponent } from './new-block-page/new-block-page.component';
import { RouterModule } from '@angular/router';
import { CommonUiComponentsModule } from '@reusable-parts/common-ui-components';
import { MainContentModule } from '@reusable-parts/main-content';
import {
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatDatepickerModule,
} from '@angular/material';
import { BlockFormComponent } from './components/block-form/block-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FuseSharedModule } from '@reusable-parts/@fuse';
import { BlockStateModule } from '../../state/blocks/block-state/block-state.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: NewBlockPageComponent },
    ]),

    CommonUiComponentsModule,
    MainContentModule,
    BlockStateModule,

    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,

    FuseSharedModule,
  ],
  declarations: [NewBlockPageComponent, BlockFormComponent],
})
export class NewBlockPageModule {}
