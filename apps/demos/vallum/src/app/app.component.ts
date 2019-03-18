import { Component, OnInit } from '@angular/core';
import { Auth0Service } from '@reusable-parts/logic/integration/auth0';

@Component({
  selector: 'vallum-root',
  template: `
    <theme [contentTemplate]="mainContentTemplate"></theme>
    <ng-template #mainContentTemplate>
      <router-outlet></router-outlet>
    </ng-template>
  `,
  styles: [
    `
      :host {
        width: 100%;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  constructor(private auth: Auth0Service) {}

  public ngOnInit(): void {
    this.auth.handleAuthentication('/dashboard');
  }
  title = 'demos-vallum';
}
