import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainContentModule } from '@reusable-parts/main-content';
import { TeachersPageComponent } from './teachers-page/teachers-page.component';
import { CommonUiComponentsModule } from '@reusable-parts/common-ui-components';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: TeachersPageComponent },
    ]),

    CommonUiComponentsModule,
    MainContentModule,
  ],
  declarations: [TeachersPageComponent],
})
export class TeachersPageModule {}
