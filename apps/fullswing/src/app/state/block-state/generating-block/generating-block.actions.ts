import { Action } from '@ngrx/store';
import { Block } from '../block';

export enum GeneratingBlockActionTypes {
  Reset = '[Generating Block] Reset',

  Attempt = '[Generating Block] Attempt Generate',

  GenerateRequest = '[Generating Block] Generate Request',
  GenerateSuccess = '[Generating Block] Generate Success',
  GenerateFailure = '[Generating Block] Generate Failure',
}

export class ResetGenerateBlock implements Action {
  readonly type = GeneratingBlockActionTypes.Reset;
}

export class AttemptGenerateBlock implements Action {
  readonly type = GeneratingBlockActionTypes.Attempt;

  constructor(public id: string) {}
}

export class GenerateBlockRequest implements Action {
  readonly type = GeneratingBlockActionTypes.GenerateRequest;

  constructor(public id: string) {}
}

export class GenerateBlockSuccess implements Action {
  readonly type = GeneratingBlockActionTypes.GenerateSuccess;

  constructor(public id: string, public newBlockId: string) {}
}

export class GenerateBlockFailure implements Action {
  readonly type = GeneratingBlockActionTypes.GenerateFailure;
  constructor(public id: string, public error: string) {}
}

export type GeneratingBlockActions =
  | ResetGenerateBlock
  | GenerateBlockRequest
  | GenerateBlockSuccess
  | GenerateBlockFailure;
