import { Action } from '@ngrx/store';
import { Block } from '../block';

export enum CreatingBlockActionTypes {
  Reset = '[Creating Block] Reset',

  Attempt = '[Creating Block] Attempt Create',

  CreateRequest = '[Creating Block] Create Request',
  CreateSuccess = '[Creating Block] Create Success',
  CreateFailure = '[Creating Block] Create Failure',
}

export class ResetCreateBlock implements Action {
  readonly type = CreatingBlockActionTypes.Reset;
}

export class AttemptCreateBlock implements Action {
  readonly type = CreatingBlockActionTypes.Attempt;

  constructor(public block: Block) {}
}

export class CreateBlockRequest implements Action {
  readonly type = CreatingBlockActionTypes.CreateRequest;

  constructor(public block: Block) {}
}

export class CreateBlockSuccess implements Action {
  readonly type = CreatingBlockActionTypes.CreateSuccess;
}

export class CreateBlockFailure implements Action {
  readonly type = CreatingBlockActionTypes.CreateFailure;
  constructor(public error: string) {}
}

export type CreatingBlockActions =
  | ResetCreateBlock
  | CreateBlockRequest
  | CreateBlockSuccess
  | CreateBlockFailure;
