import { Injectable } from '@angular/core';
import { IChatFacade, ChatContact, Chat, ChatUser } from '@reusable-parts/chat-components';
import { Observable, combineLatest, ReplaySubject } from 'rxjs';
import { mapTo, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { fromPromise } from 'rxjs/observable/fromPromise';

const USERID = '7wQms0Ow1Spn50Q18mjr';

@Injectable()
export class ChatFacade implements IChatFacade {
  contacts$: ReplaySubject<ChatContact[]>;
  chats$: ReplaySubject<Chat[]>;
  user$: ReplaySubject<ChatUser>;

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

    this.user$ = new ReplaySubject(1);
    this.af
      .doc<ChatUser>(`users/${USERID}`)
      .snapshotChanges()
      .pipe(
        map(
          a =>
            ({
              ...a.payload.data(),
              id: a.payload.id,
            } as ChatUser),
        ),
      )
      .subscribe(this.user$);
  }

  public loadAllData(): Observable<any> {
    return combineLatest(this.contacts$, this.chats$, this.user$);
  }

  public createChat(contactId: string): Observable<string> {
    const newChat = { id: contactId, dialog: [] };
    return fromPromise(this.af.collection('chats').add(newChat)).pipe(map(x => x.id));
  }

  public updateChat(chat: Chat): Observable<void> {
    return fromPromise(this.af.doc(`chats/${chat.id}`).update(chat)).pipe(mapTo(null));
  }

  public updateUser(user: ChatUser): Observable<void> {
    return fromPromise(this.af.doc(`users/${user.id}`).update(user)).pipe(mapTo(null));
  }
}
