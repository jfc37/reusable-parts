import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule, Route } from '@angular/router';
import { Auth0LoginModule } from '@reusable-parts/containers/pages/auth0-login';

const routes: Route[] = [
  {
    component: LoginComponent,
    path: '',
  },
];

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, RouterModule.forChild(routes), Auth0LoginModule],
})
export class LoginModule {}
