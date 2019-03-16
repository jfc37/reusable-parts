import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatButtonModule, MatIconModule, MatInputModule } from '@angular/material';
import { ForgotPasswordComponent } from './forgot-password.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FuseModule, FuseDirectivesModule } from '@reusable-parts/fuse';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    FlexLayoutModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,

    FuseModule.forRoot({ customScrollbars: true }),
    FuseDirectivesModule,
  ],
  declarations: [ForgotPasswordComponent],
  exports: [ForgotPasswordComponent],
})
export class ForgotPasswordModule {}
