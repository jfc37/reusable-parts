import { Injectable } from '@angular/core';
import { Block } from '../block-state/block';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import { of } from 'rxjs/observable/of';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { AngularFirestore } from 'angularfire2/firestore';
import { mapTo, tap, map } from 'rxjs/operators';
import { addMinutes, format } from 'date-fns';
import { PageKey, loadPage } from '@reusable-parts/common-ngrx-patterns/src';

@Injectable()
export class BlockRepository {
  constructor(private af: AngularFirestore) {}

  public load(key: PageKey): Observable<Block[]> {
    try {
      return loadPage<Block>(this.af, key, 'blocks');
    } catch (e) {
      console.error('Error', e);
      return _throw(e);
    }
  }

  public create(block: Block): Observable<Block> {
    try {
      const promise = this.af.firestore.runTransaction(transaction => {
        const createdBlockDoc = this.af.firestore.collection('blocks').doc();

        const classDocs = createArrayOfSize(block.numberOfClasses).map(() =>
          this.af.firestore.collection('classes').doc(),
        );

        const newBlock = {
          ...block,
          classIds: classDocs.map(doc => doc.id),
        };

        transaction.set(createdBlockDoc, newBlock);

        classDocs
          .map((doc, index) => ({
            blockClass: createClassFromBlock({ ...newBlock, id: createdBlockDoc.id }, index),
            doc,
          }))
          .forEach(({ blockClass, doc }) => {
            transaction.set(doc, blockClass);
          });

        return of({ ...newBlock, id: createdBlockDoc.id }).toPromise();
      });
      return fromPromise(promise);
    } catch (e) {
      console.error('Error', e);
      return _throw(e);
    }
  }

  public delete(block: Block): Observable<void> {
    try {
      const promise = this.af.firestore.runTransaction(transaction => {
        const blockDoc = this.af.firestore.doc('blocks/' + block.id);

        const classesToDelete = block.classIds
          .map(id => this.af.firestore.doc('classes/' + id))
          .forEach(classDoc => transaction.delete(classDoc));

        transaction.delete(blockDoc);

        return of(null).toPromise();
      });
      return fromPromise(promise);
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
