import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule, Route } from '@angular/router';

const routes: Route[] = [
  {
    component: LoginComponent,
    path: '',
  },
];

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class LoginModule {}
