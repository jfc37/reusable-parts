import { Injectable } from '@angular/core';
import { loadPage } from '@reusable-parts/common-ngrx-patterns';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import { Block } from '../block-state/block';
import { StudentEnrolment } from './student-enrolment';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { map } from 'rxjs/operators';

@Injectable()
export class StudentEnrolmentRepository {
  constructor(private af: AngularFireAuth) {}

  public load(userId: string): Observable<string[]> {
    try {
      return fromPromise(
        this.af.app
          .firestore()
          .doc(`user-enrolments/${userId}`)
          .get(),
      ).pipe(map(doc => (doc.data() ? doc.data().blockIds : [] || [])));
    } catch (e) {
      console.error('Error', e);
      return _throw(e);
    }
  }

  public update(enrolment: StudentEnrolment): Observable<void> {
    // try {
    //   return fromPromise(
    //     this.af.app
    //       .firestore()
    //       .doc(`user-enrolments/${userId}`)
    //       .get(),
    //   ).pipe(map(doc => (doc.data() ? doc.data().blockIds : [] || [])));
    // } catch (e) {
    // console.error('Error', e);
    // return _throw(e);
    // }
    return _throw('error');
  }
}
