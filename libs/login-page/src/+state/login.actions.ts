import { Action } from '@ngrx/store';

export enum LoginActionTypes {
  ResetLoginPage = '[Login] Reset Page',

  AttemptLogin = '[Login] Attempt',
  LoginRequest = '[Login] Request',
  LoginSuccess = '[Login] Success',
  LoginFailure = '[Login] Failure',
}

export class ResetLoginPage implements Action {
  readonly type = LoginActionTypes.ResetLoginPage;
}

export class AttemptLogin implements Action {
  readonly type = LoginActionTypes.AttemptLogin;

  constructor(public email: string, public password: string) { }
}

export class LoginRequest implements Action {
  readonly type = LoginActionTypes.LoginRequest;
}

export class LoginSuccess implements Action {
  readonly type = LoginActionTypes.LoginSuccess;
}

export class LoginFailure implements Action {
  readonly type = LoginActionTypes.LoginFailure;
}

export type LoginActions
  = ResetLoginPage
  | AttemptLogin
  | LoginRequest
  | LoginSuccess
  | LoginFailure;
