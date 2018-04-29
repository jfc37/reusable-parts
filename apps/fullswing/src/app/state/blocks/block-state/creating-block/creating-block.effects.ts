import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { BlockFeatureState } from '../block-feature.reducer';
import {
  AttemptCreateBlock,
  CreatingBlockActionTypes,
  ResetCreateBlock,
  CreateBlockRequest,
  CreateBlockSuccess,
  CreateBlockFailure,
} from './creating-block.actions';
import {
  withLatestFrom,
  map,
  filter,
  mergeMap,
  tap,
  switchMap,
  catchError,
  delay,
} from 'rxjs/operators';
import {
  hasCreateBlockErroredSelector,
  shouldCreateBlockSelector,
} from './creating-block.selectors';
import { BlockRepository } from '../block.repository';
import { of } from 'rxjs/observable/of';

@Injectable()
export class CreateBlockEffects {
  @Effect()
  attempt$ = this.actions$
    .ofType<AttemptCreateBlock>(CreatingBlockActionTypes.Attempt)
    .pipe(
      map(action => action.block),
      withLatestFrom(
        this.store.select(shouldCreateBlockSelector),
        (block, shouldCreate) => shouldCreate && new CreateBlockRequest(block)
      ),
      withLatestFrom(
        this.store.select(hasCreateBlockErroredSelector),
        (requestAction, hasError) => [
          hasError && new ResetCreateBlock(),
          requestAction,
        ]
      ),
      filter(actions => actions.length > 0),
      mergeMap(actions => actions.filter(Boolean))
    );

  @Effect()
  loadAll$ = this.actions$
    .ofType<CreateBlockRequest>(CreatingBlockActionTypes.CreateRequest)
    .pipe(
      delay(5000),
      switchMap(action =>
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
