import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewBlocksPageComponent } from './view-blocks-page/view-blocks-page.component';
import { RouterModule } from '@angular/router';
import { CommonUiComponentsModule } from '@reusable-parts/common-ui-components';
import { MainContentModule } from '@reusable-parts/main-content';
import { MatTableModule, MatButtonModule } from '@angular/material';
import { BlocksTableComponent } from './components/blocks-table/blocks-table.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ViewBlocksPageComponent },
    ]),

    CommonUiComponentsModule,
    MainContentModule,

    MatTableModule,
    MatButtonModule,
  ],
  declarations: [ViewBlocksPageComponent, BlocksTableComponent],
})
export class ViewBlocksPageModule {}
