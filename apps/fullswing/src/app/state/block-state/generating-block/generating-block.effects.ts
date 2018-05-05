import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  AttemptGenerateBlock,
  GeneratingBlockActionTypes,
  GenerateBlockRequest,
  GenerateBlockFailure,
  GenerateBlockSuccess,
} from './generating-block.actions';
import {
  withLatestFrom,
  filter,
  map,
  mergeMap,
  catchError,
} from 'rxjs/operators';
import { allGeneratingBlockIdsSelector } from './generating-block.selectors';
import { BlockRepository } from '../block.repository';
import { BlockFeatureState } from '../block-feature.reducer';
import { blocksDictionarySelector } from '../blocks/blocks.selectors';
import { addWeeks, format } from 'date-fns';
import { of } from 'rxjs/observable/of';
import { SetBlocks } from '../blocks/blocks.actions';
import { Block } from '../block';
import { allBlockPagesSelector } from '../block-pages/block-pages.selectors';
import { SetBlockPage } from '../block-pages/block-pages.actions';

@Injectable()
export class GeneratingBlockEffects {
  @Effect()
  attempt$ = this.actions$
    .ofType<AttemptGenerateBlock>(GeneratingBlockActionTypes.Attempt)
    .pipe(
      filter(action => Boolean(action.id)),
      withLatestFrom(this.store.select(allGeneratingBlockIdsSelector)),
      filter(([action, updatingIds]) => !updatingIds.includes(action.id)),
      map(([action]) => new GenerateBlockRequest(action.id))
    );

  @Effect()
  generate$ = this.actions$
    .ofType<AttemptGenerateBlock>(GeneratingBlockActionTypes.GenerateRequest)
    .pipe(
      withLatestFrom(
        this.store.select(blocksDictionarySelector),
        (action, blocks) => ({
          id: action.id,
          block: createNextBlock(blocks[action.id]),
        })
      ),
      mergeMap(({ id, block }) =>
        this.repository
          .create(block)
          .pipe(
            mergeMap(newBlock => [
              new SetBlocks(newBlock),
              new GenerateBlockSuccess(id, newBlock.id),
            ]),
            catchError(err =>
              of(new GenerateBlockFailure(id, err || 'Failed generating block'))
            )
          )
      )
    );

  @Effect()
  generateSuccess$ = this.actions$
    .ofType<GenerateBlockSuccess>(GeneratingBlockActionTypes.GenerateSuccess)
    .pipe(
      withLatestFrom(
        this.store.select(allBlockPagesSelector),
        (action, pages) =>
          pages.filter(page => page.ids.includes(action.id)).map(page => ({
            ...page,
            ids: [...page.ids, action.newBlockId],
          }))
      ),
      map(updatedPages => new SetBlockPage(...updatedPages))
    );

  constructor(
    private actions$: Actions,
    private store: Store<BlockFeatureState>,
    private repository: BlockRepository
  ) {}
}

function createNextBlock(block: Block): Block {
  const newBlock = {
    ...block,
    id: undefined,
    startDate: format(
      addWeeks(block.startDate, block.numberOfClasses),
      'YYYY-MM-DD'
    ),
  };

  delete newBlock.id;
  return newBlock;
}
