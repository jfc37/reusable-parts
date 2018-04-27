import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachersComponent } from './containers/teachers/teachers.component';
import { RouterModule } from '@angular/router';
import { MainContentModule } from '@reusable-parts/main-content';
import { UserStateModule } from '@reusable-parts/user-state';
import { CommonUiComponentsModule } from '@reusable-parts/common-ui-components';

@NgModule({
  imports: [
    CommonModule,

    UserStateModule,
    CommonUiComponentsModule,

    RouterModule.forChild([
      { path: '', pathMatch: 'full', redirectTo: 'teachers' },
      { path: 'teachers', pathMatch: 'full', component: TeachersComponent },
    ]),

    MainContentModule,
  ],
  declarations: [TeachersComponent],
})
export class AdminModule {}
