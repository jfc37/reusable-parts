import { Injectable } from '@angular/core';
import { Block } from '../block-state/block';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import { of } from 'rxjs/observable/of';

@Injectable()
export class BlockRepository {
  constructor() {}

  public create(block: Block): Observable<void> {
    return of(null);
  }
}
