import { Component } from '@angular/core';
import { ChatFacade } from '../chat.facade';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
})
export class ResetComponent {
  constructor(private facade: ChatFacade) {}

  reset(): void {
    this.facade.reset();
  }
}
