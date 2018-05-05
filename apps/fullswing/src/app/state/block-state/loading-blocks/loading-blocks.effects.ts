import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  getFirstPageKey,
  getNewKey,
  getNextPageKey,
} from '@reusable-parts/common-ngrx-patterns';
import {
  exhaustMap,
  filter,
  map,
  mergeMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { BlockFeatureState } from '../block-feature.reducer';
import { BlockRepository } from '../block.repository';
import { SetBlocks } from '../blocks/blocks.actions';
import {
  AttemptLoadBlocks,
  GetMoreBlocks,
  LoadBlocksRequest,
  LoadBlocksSuccess,
  LoadingBlocksActionTypes,
} from './loading-blocks.actions';
import {
  getLastestBlockPageSelector,
  hasFirstPageSelector,
  isLoadingAnyPagesSelector,
} from './loading-blocks.selectors';

@Injectable()
export class LoadingBlocksEffects {
  @Effect()
  getFirstPage$ = this.actions$
    .ofType<GetMoreBlocks>(LoadingBlocksActionTypes.GetMore)
    .pipe(
      withLatestFrom(this.store.select(hasFirstPageSelector)),
      filter(([action, hasFirstPage]) => !hasFirstPage),
      map(
        ([action]) =>
          new AttemptLoadBlocks(
            getFirstPageKey(action.orderBy, action.orderDirection)
          )
      )
    );

  @Effect()
  getNextPage$ = this.actions$
    .ofType<GetMoreBlocks>(LoadingBlocksActionTypes.GetMore)
    .pipe(
      withLatestFrom(
        this.store.select(getLastestBlockPageSelector),
        (action, latestPage) => latestPage
      ),
      filter(lastestPage => Boolean(lastestPage)),
      map(latestPage => new AttemptLoadBlocks(getNextPageKey(latestPage)))
    );

  @Effect()
  attemptLoadPage$ = this.actions$
    .ofType<AttemptLoadBlocks>(LoadingBlocksActionTypes.Attempt)
    .pipe(
      withLatestFrom(this.store.select(isLoadingAnyPagesSelector)),
      filter(([action, isAnyLoading]) => !isAnyLoading),
      map(([action]) => new LoadBlocksRequest(action.key))
    );

  @Effect()
  loadPage$ = this.actions$
    .ofType<LoadBlocksRequest>(LoadingBlocksActionTypes.LoadRequest)
    .pipe(
      exhaustMap(action =>
        this.repository
          .load(action.key)
          .pipe(
            mergeMap(blocks => [
              new SetBlocks(...blocks),
              new LoadBlocksSuccess(action.key, getNewKey(action.key, blocks)),
            ])
          )
      )
    );

  constructor(
    private actions$: Actions,
    private store: Store<BlockFeatureState>,
    private repository: BlockRepository
  ) {}
}
