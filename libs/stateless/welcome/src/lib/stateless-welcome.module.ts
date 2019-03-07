import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuseSharedModule } from '@reusable-parts/fuse';
import { StatelessWelcomeComponent } from './welcome/welcome.component';

@NgModule({
  imports: [CommonModule, FuseSharedModule],
  declarations: [StatelessWelcomeComponent],
  exports: [StatelessWelcomeComponent],
})
export class StatelessWelcomeModule {}
