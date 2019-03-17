import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, TemplateRef } from '@angular/core';
import { Auth0Service } from '@reusable-parts/logic/integration/auth0';
import { LoginAttempt } from '@reusable-parts/stateless/pages/login';

@Component({
  selector: 'container-auth0-login-page',
  template: `
    <stateless-login-page
      [logoUrl]="model.logoUrl"
      [registerUrl]="model.registerUrl"
      [forgotPasswordUrl]="model.forgotPasswordUrl"
      [titleTemplate]="titleTemplate"
      [descriptionTemplate]="descriptionTemplate"
      (loginClicked)="login($event)"
    ></stateless-login-page>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Auth0LoginComponent {
  @Input() public model: Auth0Login;
  @Input() public titleTemplate: TemplateRef<any>;
  @Input() public descriptionTemplate: TemplateRef<any>;

  constructor(private authService: Auth0Service) {}

  public login(loginAttempt: LoginAttempt) {
    this.authService.login(loginAttempt);
  }
}

export interface Auth0Login {
  logoUrl: string;
  registerUrl: string;
  forgotPasswordUrl: string;
}

// @Input() public disabled: boolean;
// @Input() public errorMessage: string;
