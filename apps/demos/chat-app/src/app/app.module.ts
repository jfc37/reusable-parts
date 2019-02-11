import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import {
  ChatComponentsModule,
  IChatFacade,
  Chat,
  ChatContact,
  ChatUser,
  CHAT_FACADE,
  ChatDialog,
  ChatSummary,
} from '@reusable-parts/chat-components';
import { Observable, ReplaySubject, from, combineLatest } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, tap, mapTo } from 'rxjs/operators';

@Injectable()
export class ChatFacade implements IChatFacade {
  contacts$ = new ReplaySubject<ChatContact[]>();
  chats$ = new ReplaySubject<Chat[]>();
  user$ = new ReplaySubject<ChatUser>();

  constructor(private _httpClient: HttpClient) {}

  public loadAllData(): Observable<any> {
    return combineLatest(this.loadContacts(), this.loadChats(), this.loadUser());
  }

  public createChat(contactId: string): Observable<void> {
    return this._httpClient.post('api/chat-chats', { id: contactId, dialog: [] }).pipe(
      switchMap(() => this.loadChats()),
      mapTo(null),
    );
  }

  public updateUser(user: ChatUser): Observable<void> {
    return this._httpClient.post('api/chat-user/' + user.id, user).pipe(
      switchMap(() => this.loadUser()),
      mapTo(null),
    );
  }

  private loadContacts(): Observable<void> {
    return this._httpClient.get<ChatContact[]>('api/chat-contacts').pipe(
      tap(contacts => this.contacts$.next(contacts)),
      map(() => null),
    );
  }

  private loadChats(): Observable<void> {
    return this._httpClient.get<Chat[]>('api/chat-chats').pipe(
      tap(chats => this.chats$.next(chats)),
      map(() => null),
    );
  }

  private loadUser(): Observable<void> {
    return this._httpClient.get<ChatUser[]>('api/chat-user').pipe(
      tap(users => this.user$.next(users[0])),
      map(() => null),
    );
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NxModule.forRoot(), ChatComponentsModule],
  providers: [{ provide: CHAT_FACADE, useClass: ChatFacade }],
  bootstrap: [AppComponent],
})
export class AppModule {}
