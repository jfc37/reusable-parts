import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ForgotPasswordPageComponent } from './components/forgot-password-page/forgot-password-page.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([{ path: '', pathMatch: 'full', component: ForgotPasswordPageComponent }]),
  ],
  declarations: [ForgotPasswordPageComponent],
})
export class ForgotPasswordPageModule {}
