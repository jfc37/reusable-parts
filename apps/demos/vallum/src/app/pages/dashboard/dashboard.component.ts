import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'vallum-dashboard',
  template: `
    <stateless-page-with-nav [headerTemplate]="headerTemplate"></stateless-page-with-nav>
    <ng-template #headerTemplate>Dashboard</ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {}
