import { Injectable } from '@angular/core';
import { loadPage } from '@reusable-parts/common-ngrx-patterns/src';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import { Block } from '../block-state/block';
import { StudentEnrolment } from './student-enrolment';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { map, mapTo } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class StudentEnrolmentRepository {
  constructor(private af: AngularFirestore) {}

  public load(userId: string): Observable<string[]> {
    try {
      return fromPromise(this.af.firestore.doc(`user-enrolments/${userId}`).get()).pipe(
        map(doc => (doc.data() ? doc.data().blockIds : [] || [])),
      );
    } catch (e) {
      console.error('Error', e);
      return _throw(e);
    }
  }

  public update(userId: string, blockIds: string[]): Observable<void> {
    try {
      return fromPromise(this.af.firestore.doc(`user-enrolments/${userId}`).set({ blockIds })).pipe(mapTo(null));
    } catch (e) {
      console.error('Error', e);
      return _throw(e);
    }
  }
}
