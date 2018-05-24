import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmUpdateComponent } from './components/confirm-update/confirm-update.component';
import { MatButtonModule, MatToolbarModule } from '@angular/material';
import { FuseSharedModule } from '@reusable-parts/@fuse';
import { OfflineWarningComponent } from './components/offline-warning/offline-warning.component';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatToolbarModule, FuseSharedModule],
  declarations: [ConfirmUpdateComponent, OfflineWarningComponent],
  exports: [ConfirmUpdateComponent, OfflineWarningComponent],
})
export class CommonPwaPartsModule {}
