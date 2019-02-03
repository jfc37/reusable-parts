import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { MatProgressSpinnerModule, MatIconModule } from '@angular/material';
import { FuseSharedModule } from '@reusable-parts/@fuse';
import { AlertComponent } from './components/alert/alert.component';
import { ElevateOnHoverDirective } from './directives/elevate-on-hover.directive';
import { SimpleLayoutComponent } from './components/simple-layout/simple-layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [CommonModule, BrowserAnimationsModule, MatProgressSpinnerModule, MatIconModule, FuseSharedModule],
  declarations: [LoaderComponent, AlertComponent, ElevateOnHoverDirective, SimpleLayoutComponent],
  exports: [LoaderComponent, AlertComponent, ElevateOnHoverDirective, SimpleLayoutComponent],
})
export class CommonUiComponentsModule {}
