import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { addWeeks, format } from 'date-fns';
import { of } from 'rxjs/observable/of';
import {
  catchError,
  filter,
  map,
  mergeMap,
  withLatestFrom,
  delay,
} from 'rxjs/operators';
import { Block } from '../block';
import { BlockFeatureState } from '../block-feature.reducer';
import { SetBlockPage } from '../block-pages/block-pages.actions';
import { allBlockPagesSelector } from '../block-pages/block-pages.selectors';
import { BlockRepository } from '../block.repository';
import { SetBlocks } from '../blocks/blocks.actions';
import { blocksDictionarySelector } from '../blocks/blocks.selectors';
import {
  AttemptDeleteBlock,
  DeleteBlockFailure,
  DeleteBlockRequest,
  DeleteBlockSuccess,
  DeletingBlockActionTypes,
  ResetDeleteBlock,
} from './deleting-block.actions';
import { allDeletingBlockIdsSelector } from './deleting-block.selectors';

@Injectable()
export class DeletingBlockEffects {
  @Effect()
  attempt$ = this.actions$
    .ofType<AttemptDeleteBlock>(DeletingBlockActionTypes.Attempt)
    .pipe(
      filter(action => Boolean(action.id)),
      withLatestFrom(this.store.select(allDeletingBlockIdsSelector)),
      filter(([action, deletingIds]) => !deletingIds.includes(action.id)),
      map(([action]) => new DeleteBlockRequest(action.id))
    );

  @Effect()
  delete$ = this.actions$
    .ofType<AttemptDeleteBlock>(DeletingBlockActionTypes.DeleteRequest)
    .pipe(
      delay(4000),
      map(action => new DeleteBlockFailure(action.id, 'boom'))
      // withLatestFrom(
      //   this.store.select(blocksDictionarySelector),
      //   (action, blocks) => ({
      //     id: action.id,
      //     block: createNextBlock(blocks[action.id]),
      //   })
      // ),
      // mergeMap(({ id, block }) =>
      //   this.repository
      //     .create(block)
      //     .pipe(
      //       mergeMap(newBlock => [
      //         new SetBlocks(newBlock),
      //         new DeleteBlockSuccess(id, newBlock.id),
      //       ]),
      //       catchError(err =>
      //         of(new DeleteBlockFailure(id, err || 'Failed deleting block'))
      //       )
      //     )
      // )
    );

  @Effect()
  deleteSuccessReset$ = this.actions$
    .ofType<DeleteBlockSuccess>(DeletingBlockActionTypes.DeleteSuccess)
    .pipe(map(() => new ResetDeleteBlock()));

  constructor(
    private actions$: Actions,
    private store: Store<BlockFeatureState>,
    private repository: BlockRepository
  ) {}
}
