import { Action } from '@ngrx/store';
import { PageKey, SortDirection } from '@reusable-parts/common-ngrx-patterns/src';

export enum LoadingBlockPagesActionTypes {
  Reset = '[Loading Block Pages] Reset',

  GetMore = '[Loading Block Pages] Get More',

  Attempt = '[Loading Block Pages] Attempt Load',

  LoadRequest = '[Loading Block Pages] Load Request',
  LoadSuccess = '[Loading Block Pages] Load Success',
  LoadFailure = '[Loading Block Pages] Load Failure',
}

export class ResetLoadBlockPages implements Action {
  readonly type = LoadingBlockPagesActionTypes.Reset;
}

export class GetMoreBlocks implements Action {
  readonly type = LoadingBlockPagesActionTypes.GetMore;
}

export class AttemptLoadBlockPages implements Action {
  readonly type = LoadingBlockPagesActionTypes.Attempt;

  constructor(public key: PageKey) {}
}

export class LoadBlockPagesRequest implements Action {
  readonly type = LoadingBlockPagesActionTypes.LoadRequest;

  constructor(public key: PageKey) {}
}

export class LoadBlockPagesSuccess implements Action {
  readonly type = LoadingBlockPagesActionTypes.LoadSuccess;
  constructor(public key: PageKey, public updatedKey: PageKey) {}
}

export class LoadBlockPagesFailure implements Action {
  readonly type = LoadingBlockPagesActionTypes.LoadFailure;
  constructor(public key: PageKey, public error: string) {}
}

export type LoadingBlockPagesActions =
  | ResetLoadBlockPages
  | LoadBlockPagesRequest
  | LoadBlockPagesSuccess
  | LoadBlockPagesFailure;
