import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainContentComponent } from './main-content/main-content.component';
import { FuseSharedModule } from '@reusable-parts/@fuse';

@NgModule({
  imports: [
    CommonModule,
    FuseSharedModule,
  ],
  declarations: [MainContentComponent],
  exports: [MainContentComponent],
})
export class MainContentModule {}
