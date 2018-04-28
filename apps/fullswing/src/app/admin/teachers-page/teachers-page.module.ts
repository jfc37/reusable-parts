import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainContentModule } from '@reusable-parts/main-content';
import { TeachersPageComponent } from './teachers-page/teachers-page.component';
import { CommonUiComponentsModule } from '@reusable-parts/common-ui-components';
import { ViewTeachersComponent } from './components/view-teachers/view-teachers.component';
import { MatTableModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: TeachersPageComponent },
    ]),

    CommonUiComponentsModule,
    MainContentModule,

    MatTableModule,
    MatButtonModule,
  ],
  declarations: [TeachersPageComponent, ViewTeachersComponent],
})
export class TeachersPageModule {}
