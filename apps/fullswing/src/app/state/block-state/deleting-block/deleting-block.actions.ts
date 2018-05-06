import { Action } from '@ngrx/store';
import { Block } from '../block';

export enum DeletingBlockActionTypes {
  Reset = '[Deleting Block] Reset',

  Attempt = '[Deleting Block] Attempt Delete',

  DeleteRequest = '[Deleting Block] Delete Request',
  DeleteSuccess = '[Deleting Block] Delete Success',
  DeleteFailure = '[Deleting Block] Delete Failure',
}

export class ResetDeleteBlock implements Action {
  readonly type = DeletingBlockActionTypes.Reset;
}

export class AttemptDeleteBlock implements Action {
  readonly type = DeletingBlockActionTypes.Attempt;

  constructor(public id: string) {}
}

export class DeleteBlockRequest implements Action {
  readonly type = DeletingBlockActionTypes.DeleteRequest;

  constructor(public id: string) {}
}

export class DeleteBlockSuccess implements Action {
  readonly type = DeletingBlockActionTypes.DeleteSuccess;

  constructor(public id: string) {}
}

export class DeleteBlockFailure implements Action {
  readonly type = DeletingBlockActionTypes.DeleteFailure;
  constructor(public id: string, public error: string) {}
}

export type DeletingBlockActions =
  | ResetDeleteBlock
  | DeleteBlockRequest
  | DeleteBlockSuccess
  | DeleteBlockFailure;
