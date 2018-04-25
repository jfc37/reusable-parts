import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmUpdateComponent } from './components/confirm-update/confirm-update.component';
import { MatButtonModule, MatToolbarModule } from '@angular/material';
import { FuseSharedModule } from '@reusable-parts/@fuse';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatToolbarModule, FuseSharedModule],
  declarations: [ConfirmUpdateComponent],
  exports: [ConfirmUpdateComponent],
})
export class CommonPwaPartsModule {}
