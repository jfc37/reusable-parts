import { Action } from '@ngrx/store';

export enum RegisterActionTypes {
  ResetRegisterPage = '[Register] Reset Page',

  AttemptRegister = '[Register] Attempt',
  RegisterRequest = '[Register] Request',
  RegisterSuccess = '[Register] Success',
  RegisterFailure = '[Register] Failure',
}

export class ResetRegisterPage implements Action {
  readonly type = RegisterActionTypes.ResetRegisterPage;
}

export class AttemptRegister implements Action {
  readonly type = RegisterActionTypes.AttemptRegister;

  constructor(
    public name: string,
    public email: string,
    public password: string
  ) {}
}

export class RegisterRequest implements Action {
  readonly type = RegisterActionTypes.RegisterRequest;
}

export class RegisterSuccess implements Action {
  readonly type = RegisterActionTypes.RegisterSuccess;
}

export class RegisterFailure implements Action {
  readonly type = RegisterActionTypes.RegisterFailure;

  constructor(public error: any) {}
}

export type RegisterActions =
  | ResetRegisterPage
  | AttemptRegister
  | RegisterRequest
  | RegisterSuccess
  | RegisterFailure;
