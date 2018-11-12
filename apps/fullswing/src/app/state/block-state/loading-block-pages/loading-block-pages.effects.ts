import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { createPage, getFirstPageKey, getNewKey, getNextPageKey } from '@reusable-parts/common-ngrx-patterns/src';
import { exhaustMap, filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { BlockFeatureState } from '../block-feature.reducer';
import { BlockPagesActionTypes, SetBlockPage } from '../block-pages/block-pages.actions';
import {
  currentBlockPageOrderAndDirectionSelector,
  hasAnyCurrentBlockPagesSelector,
  hasMoreBlockPagesToRetrieveSelector,
  latestCurrentBlockPageSelector,
} from '../block-pages/block-pages.selectors';
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

@Injectable()
export class LoadingBlockPagesEffects {
  @Effect()
  getFirstPage$ = this.actions$.pipe(
    ofType<GetMoreBlocks>(LoadingBlockPagesActionTypes.GetMore, BlockPagesActionTypes.ChangeSortOrder),
    withLatestFrom(this.store.pipe(select(hasAnyCurrentBlockPagesSelector))),
    filter(([action, hasCurrentPage]) => !hasCurrentPage),
    withLatestFrom(
      this.store.pipe(select(currentBlockPageOrderAndDirectionSelector)),
      (action, orderAndDirection) => orderAndDirection,
    ),
    map(({ orderBy, sortDirection }) => new AttemptLoadBlockPages(getFirstPageKey(orderBy, sortDirection))),
  );

  @Effect()
  getNextPage$ = this.actions$.pipe(
    ofType<GetMoreBlocks>(LoadingBlockPagesActionTypes.GetMore),
    withLatestFrom(this.store.pipe(select(hasAnyCurrentBlockPagesSelector))),
    filter(([action, hasCurrentPage]) => hasCurrentPage),
    withLatestFrom(this.store.pipe(select(hasMoreBlockPagesToRetrieveSelector))),
    filter(([action, hasMorePagesToRetrieve]) => hasMorePagesToRetrieve),
    withLatestFrom(this.store.pipe(select(latestCurrentBlockPageSelector)), (action, latestPage) => latestPage),
    filter(lastestPage => Boolean(lastestPage)),
    map(latestPage => new AttemptLoadBlockPages(getNextPageKey(latestPage.key))),
  );

  @Effect()
  attemptLoadPage$ = this.actions$.pipe(
    ofType<AttemptLoadBlockPages>(LoadingBlockPagesActionTypes.Attempt),
    withLatestFrom(this.store.pipe(select(isLoadingAnyPagesSelector))),
    filter(([action, isAnyLoading]) => !isAnyLoading),
    map(([action]) => new LoadBlockPagesRequest(action.key)),
  );

  @Effect()
  loadPage$ = this.actions$.pipe(
    ofType<LoadBlockPagesRequest>(LoadingBlockPagesActionTypes.LoadRequest),
    exhaustMap(action =>
      this.repository
        .load(action.key)
        .pipe(
          mergeMap(blocks => [
            new SetBlocks(...blocks),
            new SetBlockPage(createPage(getNewKey(action.key, blocks), blocks)),
            new LoadBlockPagesSuccess(action.key, getNewKey(action.key, blocks)),
          ]),
        ),
    ),
  );

  constructor(
    private actions$: Actions,
    private store: Store<BlockFeatureState>,
    private repository: BlockRepository,
  ) {}
}
