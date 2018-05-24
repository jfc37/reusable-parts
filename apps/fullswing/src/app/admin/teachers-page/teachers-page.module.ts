import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainContentModule } from '@reusable-parts/main-content/src';
import { TeachersPageComponent } from './teachers-page/teachers-page.component';
import { CommonUiComponentsModule } from '@reusable-parts/common-ui-components/src';
import { ViewTeachersComponent } from './components/view-teachers/view-teachers.component';
import {
  MatTableModule,
  MatButtonModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule,
} from '@angular/material';
import { AddNewTeacherComponent } from './components/add-new-teacher/add-new-teacher.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    RouterModule.forChild([{ path: '', pathMatch: 'full', component: TeachersPageComponent }]),

    CommonUiComponentsModule,
    MainContentModule,

    MatTableModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  declarations: [TeachersPageComponent, ViewTeachersComponent, AddNewTeacherComponent],
})
export class TeachersPageModule {}
