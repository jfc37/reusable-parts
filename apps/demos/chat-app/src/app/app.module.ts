import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import {
  ChatComponentsModule,
  IChatFacade,
  Chat,
  ChatContact,
  ChatUser,
  CHAT_FACADE,
} from '@reusable-parts/chat-components';
import { Observable } from 'rxjs';

export class ChatFacade implements IChatFacade {
  contacts$: Observable<ChatContact[]>;
  chats$: Observable<Chat[]>;
  user$: Observable<ChatUser>;
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NxModule.forRoot(), ChatComponentsModule],
  providers: [{ provide: CHAT_FACADE, useValue: ChatFacade }],
  bootstrap: [AppComponent],
})
export class AppModule {}
