import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatIconModule, MatMenuModule, MatTooltipModule } from '@angular/material';

import { FusePipesModule } from '@reusable-parts/fuse/src/lib/@fuse/pipes/pipes.module';

import { FuseMaterialColorPickerComponent } from '@reusable-parts/fuse/src/lib/@fuse/components/material-color-picker/material-color-picker.component';

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
