import { Injectable } from '@angular/core';
import { Block } from '../block-state/block';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import { of } from 'rxjs/observable/of';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { AngularFireAuth } from 'angularfire2/auth';
import { mapTo, tap, map } from 'rxjs/operators';
import { addMinutes, format } from 'date-fns';
import { PageKey, loadPage } from '@reusable-parts/common-ngrx-patterns';

@Injectable()
export class BlockRepository {
  constructor(private af: AngularFireAuth) {}

  public load(key: PageKey): Observable<Block[]> {
    try {
      return loadPage<Block>(this.af, key, 'blocks');
    } catch (e) {
      console.error('Error', e);
      return _throw(e);
    }
  }

  public create(block: Block): Observable<void> {
    try {
      const promise = this.af.app.firestore().runTransaction(transaction => {
        const b = this.af.app
          .firestore()
          .collection('blocks')
          .doc();
        transaction.set(b, block);

        createArrayOfSize(block.numberOfClasses)
          .map((v, index) =>
            createClassFromBlock({ ...block, id: b.id }, index)
          )
          .forEach(blockClass =>
            transaction.set(
              this.af.app
                .firestore()
                .collection('classes')
                .doc(),
              blockClass
            )
          );

        return of(null).toPromise();
      });
      return fromPromise(promise).pipe(mapTo(null));
    } catch (e) {
      console.error('Error', e);
      return _throw(e);
    }
  }
}

interface Class {
  id?: string;
  blockId: string;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  teacherIds: string[];
}

function createClassFromBlock(block: Block, index: number): Class {
  const [hour, minute] = block.startTime.split(':').map(x => Number(x));
  const startTimeAsDate = new Date(null, null, null, hour, minute);
  const endTimeAsDate = addMinutes(startTimeAsDate, block.classLength);
  const endTime = format(endTimeAsDate, 'HH:mm');
  const c = {
    blockId: block.id,
    name: block.name + ' - Week ' + (index + 1),
    startTime: block.startTime,
    date: block.startDate,
    teacherIds: block.teacherIds,
    endTime,
  };
  return c;
}

function createArrayOfSize(size: number): number[] {
  return Array.apply(null, { length: size }).map(Number.call, Number);
}
