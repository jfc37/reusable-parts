import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  imports: [CommonModule, BrowserAnimationsModule, MatProgressSpinnerModule, FlexLayoutModule],
  declarations: [LoaderComponent],
  exports: [LoaderComponent],
})
export class LoaderModule {}
