import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Auth0Login } from '@reusable-parts/containers/pages/auth0-login';

@Component({
  selector: 'vallum-login',
  template: `
    <container-auth0-login-page
      [model]="model"
      [titleTemplate]="titleTemplate"
      [descriptionTemplate]="descriptionTemplate"
    ></container-auth0-login-page>
    <ng-template #titleTemplate>
      Welcome to Vallum
    </ng-template>
    <ng-template #descriptionTemplate>
      Providing self service insurance
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  public model: Auth0Login = {
    logoUrl: 'assets/vallum.png',
    registerUrl: '/register',
    forgotPasswordUrl: '/forgotten-password',
  };
}
