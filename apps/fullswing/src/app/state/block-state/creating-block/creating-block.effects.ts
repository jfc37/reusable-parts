import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import {
  catchError,
  filter,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
  exhaustMap,
} from 'rxjs/operators';
import { BlockFeatureState } from '../block-feature.reducer';
import { BlockRepository } from '../block.repository';
import {
  AttemptCreateBlock,
  CreateBlockFailure,
  CreateBlockRequest,
  CreateBlockSuccess,
  CreatingBlockActionTypes,
  ResetCreateBlock,
} from './creating-block.actions';
import {
  hasCreateBlockErroredSelector,
  shouldCreateBlockSelector,
} from './creating-block.selectors';

@Injectable()
export class CreateBlockEffects {
  @Effect()
  attemptReset$ = this.actions$
    .ofType<AttemptCreateBlock>(CreatingBlockActionTypes.Attempt)
    .pipe(
      map(action => action.block),
      withLatestFrom(
        this.store.select(hasCreateBlockErroredSelector),
        (requestAction, hasError) => hasError && new ResetCreateBlock()
      ),
      filter(Boolean)
    );

  @Effect()
  attemptCreate$ = this.actions$
    .ofType<AttemptCreateBlock>(CreatingBlockActionTypes.Attempt)
    .pipe(
      map(action => action.block),
      withLatestFrom(
        this.store.select(shouldCreateBlockSelector),
        (block, shouldCreate) => shouldCreate && new CreateBlockRequest(block)
      ),
      filter(Boolean)
    );

  @Effect()
  create$ = this.actions$
    .ofType<CreateBlockRequest>(CreatingBlockActionTypes.CreateRequest)
    .pipe(
      exhaustMap(action =>
        this.repository
          .create(action.block)
          .pipe(
            mergeMap(roles => [new CreateBlockSuccess()]),
            catchError(err =>
              of(new CreateBlockFailure(err || 'Failed creating block'))
            )
          )
      )
    );

  constructor(
    private actions$: Actions,
    private store: Store<BlockFeatureState>,
    private repository: BlockRepository
  ) {}
}
