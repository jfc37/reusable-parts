import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      {
        path: 'blocks',
        loadChildren: './block-enrol-page/block-enrol-page.module#BlockEnrolPageModule',
      },
    ]),
  ],
  declarations: [],
})
export class EnrolModule {}
