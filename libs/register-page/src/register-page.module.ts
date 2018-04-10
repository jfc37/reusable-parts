import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegisterPageComponent } from './component/register-page/register-page.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: RegisterPageComponent}
    ])
  ],
  declarations: [RegisterPageComponent]
})
export class RegisterPageModule {}
