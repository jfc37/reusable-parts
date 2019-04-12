import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { ChatModule, ChatComponent } from '@reusable-parts/containers/pages/chat';

@NgModule({
  imports: [BrowserModule, ChatModule],
  entryComponents: [ChatComponent],
})
export class AppModule {
  constructor(injector: Injector) {
    const el = createCustomElement(ChatComponent, { injector });

    customElements.define('web-chat', el);
  }
  ngDoBootstrap() {}
}
