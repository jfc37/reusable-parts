import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  imports: [CommonModule],
  declarations: [RegisterComponent],
  exports: [RegisterComponent],
})
export class RegisterModule {}
