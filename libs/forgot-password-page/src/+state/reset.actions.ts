import { Action } from '@ngrx/store';

export enum ResetActionTypes {
  ResetForgotPasswordPage = '[Forgot Password] Reset Page',

  AttemptReset = '[Forgot Password] Attempt',
  ResetRequest = '[Forgot Password] Request',
  ResetSuccess = '[Forgot Password] Success',
  ResetFailure = '[Forgot Password] Failure',
}

export class ResetForgotPasswordPage implements Action {
  readonly type = ResetActionTypes.ResetForgotPasswordPage;
}

export class AttemptReset implements Action {
  readonly type = ResetActionTypes.AttemptReset;

  constructor(public email: string) {}
}

export class ResetRequest implements Action {
  readonly type = ResetActionTypes.ResetRequest;
}

export class ResetSuccess implements Action {
  readonly type = ResetActionTypes.ResetSuccess;
}

export class ResetFailure implements Action {
  readonly type = ResetActionTypes.ResetFailure;

  constructor(public error: string) {}
}

export type ResetActions = ResetForgotPasswordPage | AttemptReset | ResetRequest | ResetSuccess | ResetFailure;
