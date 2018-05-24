import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewBlocksPageComponent } from './view-blocks-page/view-blocks-page.component';
import { RouterModule } from '@angular/router';
import { CommonUiComponentsModule } from '@reusable-parts/common-ui-components/src';
import { MainContentModule } from '@reusable-parts/main-content/src';
import { MatTableModule, MatButtonModule, MatSortModule } from '@angular/material';
import { BlocksTableComponent } from './components/blocks-table/blocks-table.component';
import { BlockStateModule } from '../../state/block-state/block-state.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    RouterModule.forChild([{ path: '', pathMatch: 'full', component: ViewBlocksPageComponent }]),

    CommonUiComponentsModule,
    MainContentModule,

    MatTableModule,
    MatButtonModule,
    MatSortModule,

    BlockStateModule,
  ],
  declarations: [ViewBlocksPageComponent, BlocksTableComponent],
})
export class ViewBlocksPageModule {}
