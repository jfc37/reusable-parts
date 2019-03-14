import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'stateless-header',
  template: `
    <div class="header accent p-24" fxLayout="row" fxLayoutAlign="start center">
      <h2><ng-content></ng-content></h2>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
