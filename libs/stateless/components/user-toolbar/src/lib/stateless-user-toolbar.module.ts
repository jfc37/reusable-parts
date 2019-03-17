import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatProgressBarModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FuseSharedModule } from '@reusable-parts/fuse/src/lib/@fuse';
import { StatelessUserToolbarComponent } from './user-toolbar/user-toolbar.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,

    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatToolbarModule,

    FuseSharedModule,
  ],
  declarations: [StatelessUserToolbarComponent],
  exports: [StatelessUserToolbarComponent],
})
export class StatelessUserToolbarModule {}
