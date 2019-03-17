import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatelessLoginPageModule } from '@reusable-parts/stateless/pages/login';
import { Auth0LoginComponent } from './auth0-login.component';

@NgModule({
  imports: [CommonModule, StatelessLoginPageModule],
  declarations: [Auth0LoginComponent],
  exports: [Auth0LoginComponent],
})
export class Auth0LoginModule {}
