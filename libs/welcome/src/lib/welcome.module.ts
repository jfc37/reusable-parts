import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FuseSharedModule } from '@reusable-parts/fuse/src/lib/@fuse';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  imports: [CommonModule, FuseSharedModule],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent],
})
export class WelcomeModule {}
