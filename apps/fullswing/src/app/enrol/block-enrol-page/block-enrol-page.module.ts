import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlockEnrolPageComponent } from './block-enrol-page/block-enrol-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonUiComponentsModule } from '@reusable-parts/common-ui-components';
import { MainContentModule } from '@reusable-parts/main-content';
import { MatButtonModule } from '@angular/material';
import { BlockStateModule } from '../../state/block-state/block-state.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    RouterModule.forChild([{ path: '', pathMatch: 'full', component: BlockEnrolPageComponent }]),

    CommonUiComponentsModule,
    MainContentModule,

    MatButtonModule,

    BlockStateModule,
  ],
  declarations: [BlockEnrolPageComponent],
})
export class BlockEnrolPageModule {}
