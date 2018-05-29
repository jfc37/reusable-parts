import { Injectable } from '@angular/core';
import { loadPage } from '@reusable-parts/common-ngrx-patterns/src';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import { Block } from '../block-state/block';
import { StudentEnrolment } from './student-enrolment';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { map, mapTo, tap } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';
import { of } from 'rxjs';

@Injectable()
export class StudentEnrolmentRepository {
  constructor(private af: AngularFirestore) {}

  public load(userId: string): Observable<string[]> {
    try {
      return fromPromise(this.af.firestore.collection(`user-enrolments/${userId}/blocks`).get()).pipe(
        map(collection => collection.docs.map(doc => doc.id) || []),
      );
    } catch (e) {
      console.error('Error', e);
      return _throw(e);
    }
  }

  public update(userId: string, blockId: string): Observable<void> {
    try {
      const promise = this.af.firestore.runTransaction(transaction => {
        const userEnrolmentDoc = this.af.firestore.doc(`user-enrolments/${userId}/blocks/${blockId}`);
        transaction.set(userEnrolmentDoc, {});

        const blockEnrolmentDoc = this.af.firestore.doc(`block-enrolments/${blockId}/students/${userId}`);
        transaction.set(blockEnrolmentDoc, {});

        return of(null).toPromise();
      });
      return fromPromise(promise);
    } catch (e) {
      console.error('Error', e);
      return _throw(e);
    }
  }
}
