import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatOptionModule,
  MatRadioModule,
  MatSelectModule,
  MatSlideToggleModule,
} from '@angular/material';
import { FuseThemeOptionsComponent } from './theme-options.component';
import { FuseDirectivesModule } from '../../directives/directives';
import { FuseMaterialColorPickerModule } from '../material-color-picker/material-color-picker.module';
import { FuseSidebarModule } from '../sidebar/sidebar.module';

@NgModule({
  declarations: [FuseThemeOptionsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    FlexLayoutModule,

    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatOptionModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,

    FuseDirectivesModule,
    FuseMaterialColorPickerModule,
    FuseSidebarModule,
  ],
  exports: [FuseThemeOptionsComponent],
})
export class FuseThemeOptionsModule {}
