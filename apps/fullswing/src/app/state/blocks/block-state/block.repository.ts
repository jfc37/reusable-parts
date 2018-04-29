import { Injectable } from '@angular/core';
import { Block } from '../block-state/block';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';

@Injectable()
export class BlockRepository {
  constructor() {}

  public create(block: Block): Observable<void> {
    return _throw('error');
  }
}
