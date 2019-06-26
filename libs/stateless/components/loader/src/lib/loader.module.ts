import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  imports: [CommonModule, MatProgressSpinnerModule, FlexLayoutModule],
  declarations: [LoaderComponent],
  exports: [LoaderComponent],
})
export class LoaderModule {}
