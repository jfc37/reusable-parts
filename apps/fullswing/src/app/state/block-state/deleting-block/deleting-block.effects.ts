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
import { SetBlocks, RemoveBlock } from '../blocks/blocks.actions';
import {
  blocksDictionarySelector,
  blockEntitiesSelector,
} from '../blocks/blocks.selectors';
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
    .ofType<DeleteBlockRequest>(DeletingBlockActionTypes.DeleteRequest)
    .pipe(
      withLatestFrom(
        this.store.select(blockEntitiesSelector),
        (action, blocks) => blocks[action.id]
      ),
      mergeMap(block =>
        this.repository
          .delete(block)
          .pipe(
            mergeMap(() => [
              new RemoveBlock(block.id),
              new DeleteBlockSuccess(block.id),
            ]),
            catchError(err =>
              of(
                new DeleteBlockFailure(block.id, err || 'Failed deleting block')
              )
            )
          )
      )
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
