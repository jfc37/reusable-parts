import { Injectable, Inject } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, Subject, ReplaySubject, concat } from 'rxjs';

import {
  IChatFacade,
  CHAT_FACADE,
  ChatContact,
  ChatUser,
  Chat,
  ChatSummary,
  UserStatus,
  ChatDialog,
} from './chat.facade';
import { tap, map, switchMap, filter, take, withLatestFrom, takeWhile, concatMap, combineLatest } from 'rxjs/operators';

@Injectable()
export class ChatService implements Resolve<any> {
  contacts$: Observable<ChatContact[]>;
  chats$: Observable<Chat[]>;
  user$: Observable<ChatUser>;
  selectedContact$: Observable<ChatContact>;
  selectedChat$: Observable<Chat>;
  onLeftSidenavViewChanged: Subject<any>;
  onRightSidenavViewChanged: Subject<any>;

  private selectedContactId$ = new ReplaySubject<string>();
  private selectedChatId$ = new ReplaySubject<string>();

  constructor(@Inject(CHAT_FACADE) private facade: IChatFacade) {
    // Set the defaults
    this.onLeftSidenavViewChanged = new Subject();
    this.onRightSidenavViewChanged = new Subject();

    this.chats$ = this.facade.chats$;
    this.user$ = this.facade.user$.pipe(
      combineLatest(this.chats$, (user, chats) => ({
        ...user,
        chatList: this.getChatListView(user.chatList, chats),
      })),
    );

    this.contacts$ = this.facade.contacts$.pipe(
      combineLatest(this.user$, (contacts, user) => contacts.filter(contact => contact.id !== user.id)),
    );

    this.selectedContact$ = this.selectedContactId$.pipe(
      filter(Boolean),
      combineLatest(this.contacts$, (id, contacts) => contacts.find(contact => contact.id === id)),
    );

    this.selectedChat$ = this.selectedChatId$.pipe(
      filter(Boolean),
      combineLatest(this.chats$, (id, chats) => chats.find(chat => chat.id === id)),
    );
  }

  getChatListView(chatSummarys: ChatSummary[], chats: Chat[]): ChatSummary[] {
    return chatSummarys.map(summary => {
      const matchingChat = chats.find(chat => chat.id === summary.id);
      if (!matchingChat) {
        return summary;
      }

      return {
        ...summary,
        lastMessage: matchingChat.dialog.length ? matchingChat.dialog.reverse()[0].message : null,
        lastMessageTime: matchingChat.dialog.length ? matchingChat.dialog.reverse()[0].time : null,
      };
    });
  }

  resolve(): Observable<any> {
    return this.facade.loadAllData();
  }

  selectChat(contactId: string): void {
    const doesChatExist$ = this.user$.pipe(
      map(user => Boolean(user.chatList.find(item => item.contactId === contactId))),
    );

    const createNewChat$ = doesChatExist$.pipe(
      takeWhile(exists => !Boolean(exists)),
      take(1),
      switchMap(() => this.facade.createChat(contactId)),
      tap(console.error.bind(null, 'createNewChat 111')),
      take(1),
    );

    const setChat$ = this.user$.pipe(
      map(user => user.chatList.find(item => item.contactId === contactId)),
      filter(Boolean),
      tap(chatSummary => this.selectedChatId$.next(chatSummary.id)),
      tap(() => this.selectedContactId$.next(contactId)),
      take(1),
    );

    concat(createNewChat$, setChat$).subscribe();
  }

  selectContact(contact: ChatContact): void {
    this.selectedContactId$.next(contact.id);
  }

  setUserStatus(status: UserStatus): void {
    this.user$
      .pipe(
        map(user => ({
          ...user,
          status,
        })),
        switchMap(user => this.facade.updateUser(user)),
      )
      .subscribe();
  }

  updateUserData(user: ChatUser): void {
    this.facade.updateUser(user).subscribe();
  }

  updateDialog(chatId: string, dialog: ChatDialog[]): Observable<any> {
    return this.chats$.pipe(
      map(chats => ({
        ...chats.find(chat => chat.id === chatId),
        dialog,
      })),
      take(1),
      switchMap(updatedChat => this.facade.updateChat(updatedChat)),
    );
  }
}
