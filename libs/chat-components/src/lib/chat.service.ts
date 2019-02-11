import { Injectable, Inject } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, Subject, ReplaySubject, concat, of } from 'rxjs';

import { FuseUtils } from '@reusable-parts/@fuse';
import { IChatFacade, CHAT_FACADE, ChatContact, ChatUser, Chat, ChatSummary } from './chat.facade';
import { tap, map, switchMap, filter, take, withLatestFrom, takeWhile, concatMap } from 'rxjs/operators';

@Injectable()
export class ChatService implements Resolve<any> {
  contacts$: Observable<ChatContact[]>;
  chats$: Observable<Chat[]>;
  user$: Observable<ChatUser>;
  selectedContact$ = new ReplaySubject<ChatContact>();
  selectedChat$ = new ReplaySubject<Chat>();
  onLeftSidenavViewChanged: Subject<any>;
  onRightSidenavViewChanged: Subject<any>;

  constructor(@Inject(CHAT_FACADE) private facade: IChatFacade) {
    // Set the defaults
    this.onLeftSidenavViewChanged = new Subject();
    this.onRightSidenavViewChanged = new Subject();

    this.contacts$ = this.facade.contacts$;
    this.chats$ = this.facade.chats$;
    this.user$ = this.facade.user$;
  }

  resolve(): Observable<any> {
    return this.facade.loadAllData();
  }

  selectChat(contactId: string): void {
    const newChatId = FuseUtils.generateGUID();
    const contact$ = this.contacts$.pipe(map(contacts => contacts.find(contact => contact.id === contactId)));

    const doesChatExist$ = this.user$.pipe(
      map(user => Boolean(user.chatList.find(item => item.contactId === contactId))),
    );

    const createNewChat$ = doesChatExist$.pipe(
      takeWhile(exists => !Boolean(exists)),
      concatMap(() => of(null)),
      switchMap(() => this.facade.createChat(newChatId)),
      switchMap(() => contact$),
      map(
        contact =>
          ({
            contactId: contactId,
            id: newChatId,
            lastMessageTime: new Date(),
            name: contact.name,
            unread: null,
          } as ChatSummary),
      ),
      withLatestFrom(this.user$, (summary, user) => ({
        ...user,
        chatList: [...user.chatList, summary],
      })),
      switchMap(user => this.facade.updateUser(user)),
      take(1),
    );

    const setChat$ = this.user$.pipe(
      map(user => user.chatList.find(item => item.contactId === contactId)),
      filter(Boolean),
      withLatestFrom(this.chats$, (chatSummary, chats) => chats.find(chat => chat.id === chatSummary.id)),
      tap(chat => this.selectedChat$.next(chat)),
      take(1),
    );

    const setContact$ = contact$.pipe(
      tap(contact => this.selectedContact$.next(contact)),
      take(1),
    );
    concat(createNewChat$, setChat$, setContact$).subscribe();
  }

  selectContact(contact): void {
    this.selectedContact$.next(contact);
  }

  setUserStatus(status): void {
    // TODO UPDATE HERE
    // this.user.status = status;
  }

  updateUserData(userData): void {
    // TODO UPDATE HERE
    // this._httpClient.post('api/chat-user/' + this.user.id, userData).subscribe((response: any) => {
    //   this.user = userData;
    // });
  }

  updateDialog(chatId, dialog): Observable<any> {
    return null;
    // return new Promise((resolve, reject) => {
    //   const newData = {
    //     id: chatId,
    //     dialog: dialog,
    //   };

    //   this._httpClient.post('api/chat-chats/' + chatId, newData).subscribe(updatedChat => {
    //     resolve(updatedChat);
    //   }, reject);
    // });
  }
}
