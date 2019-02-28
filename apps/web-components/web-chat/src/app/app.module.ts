import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { ChatComponentsModule, ChatComponent } from '@reusable-parts/chat-components';

@NgModule({
  imports: [BrowserModule, ChatComponentsModule],
  entryComponents: [ChatComponent],
})
export class AppModule {
  constructor(private injector: Injector) {
    const el = createCustomElement(ChatComponent, { injector });

    customElements.define('web-chat', el);
  }
  // constructor(private injector: Injector) {}
  ngDoBootstrap() {
    // const el = createCustomElement(AppComponent, { injector: this.injector });
    // customElements.define('web-chat', el);
  }
}
