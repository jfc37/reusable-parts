import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainContentModule } from '@reusable-parts/main-content';
import { UserStateModule } from '@reusable-parts/user-state';
import { CommonUiComponentsModule } from '@reusable-parts/common-ui-components';

@NgModule({
  imports: [
    CommonModule,

    UserStateModule,

    RouterModule.forChild([
      { path: '', pathMatch: 'full', redirectTo: 'teachers' },
      {
        path: 'teachers',
        loadChildren: './teachers-page/teachers-page.module#TeachersPageModule',
      },
      {
        path: 'blocks',
        loadChildren: './view-blocks-page/view-blocks-page.module#ViewBlocksPageModule',
      },
      {
        path: 'blocks/new',
        loadChildren: './new-block-page/new-block-page.module#NewBlockPageModule',
      },
    ]),
  ],
})
export class AdminModule {}
