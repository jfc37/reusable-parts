import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  getFirstPageKey,
  getNewKey,
  getNextPageKey,
  createPage,
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
  AttemptLoadBlockPages,
  GetMoreBlocks,
  LoadBlockPagesRequest,
  LoadBlockPagesSuccess,
  LoadingBlockPagesActionTypes,
} from './loading-block-pages.actions';
import { isLoadingAnyPagesSelector } from './loading-block-pages.selectors';
import {
  SetBlockPage,
  BlockPagesActionTypes,
} from '../block-pages/block-pages.actions';
import {
  currentBlockPageOrderAndDirectionSelector,
  hasAnyCurrentBlockPagesSelector,
  latestCurrentBlockPageSelector,
} from '../block-pages/block-pages.selectors';

@Injectable()
export class LoadingBlockPagesEffects {
  @Effect()
  getFirstPage$ = this.actions$
    .ofType<GetMoreBlocks>(
      LoadingBlockPagesActionTypes.GetMore,
      BlockPagesActionTypes.ChangeSortOrder
    )
    .pipe(
      withLatestFrom(this.store.select(hasAnyCurrentBlockPagesSelector)),
      filter(([action, hasCurrentPage]) => !hasCurrentPage),
      withLatestFrom(
        this.store.select(currentBlockPageOrderAndDirectionSelector),
        (action, orderAndDirection) => orderAndDirection
      ),
      map(
        ({ orderBy, sortDirection }) =>
          new AttemptLoadBlockPages(getFirstPageKey(orderBy, sortDirection))
      )
    );

  @Effect()
  getNextPage$ = this.actions$
    .ofType<GetMoreBlocks>(LoadingBlockPagesActionTypes.GetMore)
    .pipe(
      withLatestFrom(this.store.select(hasAnyCurrentBlockPagesSelector)),
      filter(([action, hasCurrentPage]) => hasCurrentPage),
      withLatestFrom(
        this.store.select(latestCurrentBlockPageSelector),
        (action, latestPage) => latestPage
      ),
      filter(lastestPage => Boolean(lastestPage)),
      map(
        latestPage => new AttemptLoadBlockPages(getNextPageKey(latestPage.key))
      )
    );

  @Effect()
  attemptLoadPage$ = this.actions$
    .ofType<AttemptLoadBlockPages>(LoadingBlockPagesActionTypes.Attempt)
    .pipe(
      withLatestFrom(this.store.select(isLoadingAnyPagesSelector)),
      filter(([action, isAnyLoading]) => !isAnyLoading),
      map(([action]) => new LoadBlockPagesRequest(action.key))
    );

  @Effect()
  loadPage$ = this.actions$
    .ofType<LoadBlockPagesRequest>(LoadingBlockPagesActionTypes.LoadRequest)
    .pipe(
      exhaustMap(action =>
        this.repository
          .load(action.key)
          .pipe(
            mergeMap(blocks => [
              new SetBlocks(...blocks),
              new SetBlockPage(
                createPage(getNewKey(action.key, blocks), blocks)
              ),
              new LoadBlockPagesSuccess(
                action.key,
                getNewKey(action.key, blocks)
              ),
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
