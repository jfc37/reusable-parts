import { Injectable } from '@angular/core';
import { IChatFacade, ChatContact, Chat, ChatUser } from '@reusable-parts/chat-components';
import { ReplaySubject, Observable, combineLatest } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { switchMap, mapTo, tap, map } from 'rxjs/operators';

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

  public updateChat(chat: Chat): Observable<void> {
    return this._httpClient.post(`api/chat-chats/${chat.id}`, chat).pipe(
      switchMap(() => this.loadChats()),
      switchMap(() => this.loadUser()),
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
