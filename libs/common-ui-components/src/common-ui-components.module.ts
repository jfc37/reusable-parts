import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { MatProgressSpinnerModule } from '@angular/material';
import { FuseSharedModule } from '@reusable-parts/@fuse';

@NgModule({
  imports: [CommonModule, MatProgressSpinnerModule, FuseSharedModule],
  declarations: [LoaderComponent],
  exports: [LoaderComponent],
})
export class CommonUiComponentsModule {}
