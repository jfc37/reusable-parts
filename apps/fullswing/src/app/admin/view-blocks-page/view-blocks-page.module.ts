import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewBlocksPageComponent } from './view-blocks-page/view-blocks-page.component';
import { RouterModule } from '@angular/router';
import { CommonUiComponentsModule } from '@reusable-parts/common-ui-components';
import { MainContentModule } from '@reusable-parts/main-content';
import { MatTableModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ViewBlocksPageComponent },
    ]),

    CommonUiComponentsModule,
    MainContentModule,

    MatTableModule,
    MatButtonModule,
  ],
  declarations: [ViewBlocksPageComponent],
})
export class ViewBlocksPageModule {}
