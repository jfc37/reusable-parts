import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { MatProgressSpinnerModule, MatIconModule } from '@angular/material';
import { FuseSharedModule } from '@reusable-parts/@fuse';
import { AlertComponent } from './components/alert/alert.component';

@NgModule({
  imports: [CommonModule, MatProgressSpinnerModule, MatIconModule, FuseSharedModule],
  declarations: [LoaderComponent, AlertComponent],
  exports: [LoaderComponent, AlertComponent],
})
export class CommonUiComponentsModule {}
