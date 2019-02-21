import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { FuseConfirmDialogComponent } from './confirm-dialog.component';

@NgModule({
  declarations: [FuseConfirmDialogComponent],
  imports: [MatDialogModule, MatButtonModule],
  entryComponents: [FuseConfirmDialogComponent],
})
export class FuseConfirmDialogModule {}
