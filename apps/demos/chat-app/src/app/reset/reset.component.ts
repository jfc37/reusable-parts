import { Component, Inject } from '@angular/core';
import { ChatFacade } from '../chat.facade';
import { CHAT_FACADE } from '@reusable-parts/chat-components';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
})
export class ResetComponent {
  constructor(@Inject(CHAT_FACADE) private facade: ChatFacade) {}

  reset(): void {
    this.facade.reset();
  }
}
