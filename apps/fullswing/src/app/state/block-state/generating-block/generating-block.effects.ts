import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { addWeeks, format } from 'date-fns';
import { of } from 'rxjs/observable/of';
import { catchError, filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Block } from '../block';
import { BlockFeatureState } from '../block-feature.reducer';
import { SetBlockPage } from '../block-pages/block-pages.actions';
import { allBlockPagesSelector } from '../block-pages/block-pages.selectors';
import { BlockRepository } from '../block.repository';
import { SetBlocks } from '../blocks/blocks.actions';
import { blocksDictionarySelector } from '../blocks/blocks.selectors';
import {
  AttemptGenerateBlock,
  GenerateBlockFailure,
  GenerateBlockRequest,
  GenerateBlockSuccess,
  GeneratingBlockActionTypes,
  ResetGenerateBlock,
} from './generating-block.actions';
import { allGeneratingBlockIdsSelector } from './generating-block.selectors';

@Injectable()
export class GeneratingBlockEffects {
  @Effect()
  attempt$ = this.actions$.pipe(
    ofType<AttemptGenerateBlock>(GeneratingBlockActionTypes.Attempt),
    filter(action => Boolean(action.id)),
    withLatestFrom(this.store.pipe(select(allGeneratingBlockIdsSelector))),
    filter(([action, updatingIds]) => !updatingIds.includes(action.id)),
    map(([action]) => new GenerateBlockRequest(action.id)),
  );

  @Effect()
  generate$ = this.actions$.pipe(
    ofType<AttemptGenerateBlock>(GeneratingBlockActionTypes.GenerateRequest),
    withLatestFrom(this.store.pipe(select(blocksDictionarySelector)), (action, blocks) => ({
      id: action.id,
      block: createNextBlock(blocks[action.id]),
    })),
    mergeMap(({ id, block }) =>
      this.repository.create(block).pipe(
        mergeMap(newBlock => [new SetBlocks(newBlock), new GenerateBlockSuccess(id, newBlock.id)]),
        catchError(err => of(new GenerateBlockFailure(id, err || 'Failed generating block'))),
      ),
    ),
  );

  @Effect()
  generateSuccess$ = this.actions$.pipe(
    ofType<GenerateBlockSuccess>(GeneratingBlockActionTypes.GenerateSuccess),
    withLatestFrom(this.store.pipe(select(allBlockPagesSelector)), (action, pages) =>
      pages
        .filter(page => page.ids.includes(action.id))
        .map(page => ({
          ...page,
          ids: [...page.ids, action.newBlockId],
        })),
    ),
    map(updatedPages => new SetBlockPage(...updatedPages)),
  );

  @Effect()
  generateSuccessReset$ = this.actions$.pipe(
    ofType<GenerateBlockSuccess>(GeneratingBlockActionTypes.GenerateSuccess),
    map(() => new ResetGenerateBlock()),
  );

  constructor(
    private actions$: Actions,
    private store: Store<BlockFeatureState>,
    private repository: BlockRepository,
  ) {}
}

function createNextBlock(block: Block): Block {
  const newBlock = {
    ...block,
    id: undefined,
    startDate: format(addWeeks(block.startDate, block.numberOfClasses), 'YYYY-MM-DD'),
  };

  delete newBlock.id;
  return newBlock;
}
