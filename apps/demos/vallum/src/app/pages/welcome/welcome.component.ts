import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Auth0Service } from '@reusable-parts/logic/integration/auth0';

@Component({
  selector: 'vallum-welcome',
  template: `
    <stateless-hero-text [headerTemplate]="title" [contentTemplate]="content"></stateless-hero-text>
    <ng-template #title>Welcome to Vallum</ng-template>
    <ng-template #content>
      <p>
        Sign up with us to get your insurance needs sorted
      </p>
      <div class="p-24">
        <button
          data-test-id="login-button"
          mat-raised-button
          color="accent"
          aria-label="Login / Sign Up"
          (click)="login()"
        >
          Log in / Sign up
        </button>
      </div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeComponent {
  constructor(private auth0: Auth0Service) {}

  public login(): void {
    this.auth0.login();
  }
}
