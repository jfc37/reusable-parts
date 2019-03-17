import { Component } from '@angular/core';

@Component({
  selector: 'vallum-root',
  template: `
    <theme [theme]="theme" [contentTemplate]="mainContentTemplate"></theme>
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
export class AppComponent {
  title = 'demos-vallum';
}
