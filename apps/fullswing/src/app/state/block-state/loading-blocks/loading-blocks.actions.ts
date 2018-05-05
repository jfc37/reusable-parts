import { Action } from '@ngrx/store';
import {
  PaginationKey,
  SortDirection,
} from '@reusable-parts/common-ngrx-patterns';

export enum LoadingBlocksActionTypes {
  Reset = '[Loading Blocks] Reset',

  GetMore = '[Loading Blocks] Get More',

  Attempt = '[Loading Blocks] Attempt Load',

  LoadRequest = '[Loading Blocks] Load Request',
  LoadSuccess = '[Loading Blocks] Load Success',
  LoadFailure = '[Loading Blocks] Load Failure',
}

export class ResetLoadBlocks implements Action {
  readonly type = LoadingBlocksActionTypes.Reset;
}

export class GetMoreBlocks implements Action {
  readonly type = LoadingBlocksActionTypes.GetMore;

  constructor(public orderBy: string, public orderDirection: SortDirection) {}
}

export class AttemptLoadBlocks implements Action {
  readonly type = LoadingBlocksActionTypes.Attempt;

  constructor(public key: PaginationKey) {}
}

export class LoadBlocksRequest implements Action {
  readonly type = LoadingBlocksActionTypes.LoadRequest;

  constructor(public key: PaginationKey) {}
}

export class LoadBlocksSuccess implements Action {
  readonly type = LoadingBlocksActionTypes.LoadSuccess;
  constructor(public key: PaginationKey, public updatedKey: PaginationKey) {}
}

export class LoadBlocksFailure implements Action {
  readonly type = LoadingBlocksActionTypes.LoadFailure;
  constructor(public key: PaginationKey, public error: string) {}
}

export type LoadingBlocksActions =
  | ResetLoadBlocks
  | LoadBlocksRequest
  | LoadBlocksSuccess
  | LoadBlocksFailure;
