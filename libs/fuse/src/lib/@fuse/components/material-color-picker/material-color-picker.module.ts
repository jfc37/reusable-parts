import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseMaterialColorPickerComponent } from './material-color-picker.component';
import { FusePipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [FuseMaterialColorPickerComponent],
  imports: [
    CommonModule,

    FlexLayoutModule,

    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,

    FusePipesModule,
  ],
  exports: [FuseMaterialColorPickerComponent],
})
export class FuseMaterialColorPickerModule {}
