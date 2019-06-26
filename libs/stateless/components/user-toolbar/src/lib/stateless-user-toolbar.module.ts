import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
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
