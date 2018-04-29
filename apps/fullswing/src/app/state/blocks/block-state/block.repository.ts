import { Injectable } from '@angular/core';
import { Block } from '../block-state/block';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import { of } from 'rxjs/observable/of';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { AngularFireAuth } from 'angularfire2/auth';
import { mapTo } from 'rxjs/operators';

@Injectable()
export class BlockRepository {
  constructor(private af: AngularFireAuth) {}

  public create(block: Block): Observable<void> {
    try {
      return fromPromise(
        this.af.app
          .firestore()
          .collection('blocks')
          .add(block)
      ).pipe(mapTo(null));
    } catch (e) {
      console.error('Error', e);
      return _throw(e);
    }
  }
}
