import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatDividerModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@reusable-parts/@fuse';
import { CommonUiComponentsModule } from '@reusable-parts/common-ui-components';
import { MainContentModule } from '@reusable-parts/main-content';
import { BlockStateModule } from '../../state/block-state/block-state.module';
import { BlockEnrolPageComponent } from './block-enrol-page/block-enrol-page.component';
import { BlockCardComponent } from './components/block-card/block-card.component';
import { BlockGroupComponent } from './components/block-group/block-group.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    RouterModule.forChild([{ path: '', pathMatch: 'full', component: BlockEnrolPageComponent }]),

    CommonUiComponentsModule,
    MainContentModule,
    FuseSharedModule,

    MatButtonModule,
    MatCardModule,
    MatDividerModule,

    BlockStateModule,
  ],
  declarations: [BlockEnrolPageComponent, BlockCardComponent, BlockGroupComponent],
})
export class BlockEnrolPageModule {}