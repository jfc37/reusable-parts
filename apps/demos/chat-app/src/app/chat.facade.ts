import { Injectable } from '@angular/core';
import { IChatFacade, ChatContact, Chat, ChatUser, ChatSummary } from '@reusable-parts/chat-components';
import { Observable, combineLatest, ReplaySubject } from 'rxjs';
import { mapTo, map, switchMap, withLatestFrom, take, tap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { chatUsers, chatContacts } from './fake-db.service';

@Injectable()
export class ChatFacade implements IChatFacade {
  contacts$: ReplaySubject<ChatContact[]>;
  chats$: ReplaySubject<Chat[]>;
  user$: Observable<ChatUser>;
  allUsers$: ReplaySubject<ChatUser[]>;

  public currentUserIdReplay = new ReplaySubject<string>();

  constructor(private af: AngularFirestore) {
    this.contacts$ = new ReplaySubject(1);
    this.af
      .collection<ChatContact>('contacts/')
      .snapshotChanges()
      .pipe(
        map(collection =>
          collection.map(
            a =>
              ({
                ...a.payload.doc.data(),
                id: a.payload.doc.id,
              } as ChatContact),
          ),
        ),
      )
      .subscribe(this.contacts$);

    this.chats$ = new ReplaySubject(1);
    this.af
      .collection<Chat>('chats/')
      .snapshotChanges()
      .pipe(
        map(collection =>
          collection.map(
            a =>
              ({
                ...a.payload.doc.data(),
                id: a.payload.doc.id,
              } as Chat),
          ),
        ),
      )
      .subscribe(this.chats$);

    this.allUsers$ = new ReplaySubject(1);
    this.af
      .collection<ChatUser>(`users/`)
      .snapshotChanges()
      .pipe(
        map(collection =>
          collection.map(
            a =>
              ({
                ...a.payload.doc.data(),
                id: a.payload.doc.id,
              } as ChatUser),
          ),
        ),
      )
      .subscribe(this.allUsers$);

    this.user$ = combineLatest(this.allUsers$, this.currentUserIdReplay, (users, id) =>
      users.find(user => user.id === id),
    );
  }

  public reset(): void {
    const deleteUsers$ = fromPromise(this.af.collection('users').ref.get()).pipe(
      tap(docs => {
        const batch = this.af.firestore.batch();
        docs.forEach(doc => batch.delete(doc.ref));
        batch.commit();
      }),
    );

    const deleteContacts$ = fromPromise(this.af.collection('contacts').ref.get()).pipe(
      tap(docs => {
        const batch = this.af.firestore.batch();
        docs.forEach(doc => batch.delete(doc.ref));
        batch.commit();
      }),
    );

    const deleteChats$ = fromPromise(this.af.collection('chats').ref.get()).pipe(
      tap(docs => {
        const batch = this.af.firestore.batch();
        docs.forEach(doc => batch.delete(doc.ref));
        batch.commit();
      }),
    );

    combineLatest(deleteUsers$, deleteContacts$, deleteChats$).subscribe(() => {
      chatContacts.forEach(contact => {
        this.af.doc(`contacts/${contact.id}`).set(contact);
      });

      chatUsers.forEach(user => {
        this.af.doc(`users/${user.id}`).set(user);
      });
    });
  }

  public loadAllData(): Observable<any> {
    return combineLatest(this.contacts$, this.chats$, this.user$);
  }

  public createChat(contactId: string): Observable<string> {
    return fromPromise(this.af.collection('chats').add({ dialog: [] })).pipe(
      map(x => x.id),
      switchMap(chatId => this.addChatToUsers(chatId, contactId)),
      take(1),
    );
  }

  public updateChat(chat: Chat): Observable<void> {
    return fromPromise(this.af.doc(`chats/${chat.id}`).update(chat)).pipe(mapTo(null));
  }

  public updateUser(user: ChatUser): Observable<void> {
    return fromPromise(this.af.doc(`users/${user.id}`).update(user)).pipe(mapTo(null));
  }

  private addChatToUsers(chatId: string, contactId: string): Observable<any> {
    const addToCurrentUser$ = this.user$.pipe(
      map(user => ({
        ...user,
        chatList: [...user.chatList, this.getChatSummary(contactId, chatId)],
      })),

      take(1),
      switchMap(user => this.updateUser(user)),

      take(1),
    );

    const addToOtherUser$ = this.allUsers$.pipe(
      map(users => users.find(user => user.id === contactId)),

      withLatestFrom(this.currentUserIdReplay, (user, currentUserId) => ({
        ...user,
        chatList: [...user.chatList, this.getChatSummary(currentUserId, chatId)],
      })),

      take(1),
      switchMap(user => this.updateUser(user)),

      take(1),
    );

    return combineLatest(addToCurrentUser$, addToOtherUser$);
  }

  private getChatSummary(contactId: string, chatId: string): ChatSummary {
    return {
      contactId,
      id: chatId,
      unread: null,
    } as ChatSummary;
  }
}
