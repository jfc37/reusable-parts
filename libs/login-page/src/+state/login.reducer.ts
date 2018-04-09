import { Action } from '@ngrx/store';
import { LoginActions, LoginActionTypes } from './login.actions';

/**
 * Interface for the 'Login' data used in
 *  - LoginState, and
 *  - loginReducer
 */
export interface LoginData {
  email: string;
  password: string;

  isLoggingIn: boolean;
  hasLoggedIn: boolean;
  loginFailed: boolean;
}

/**
 * Interface to the part of the Store containing LoginState
 * and other information related to LoginData.
 */
export interface LoginState {
  readonly login: LoginData;
}

export const initialState: LoginData = {
  email: null,
  password: null,

  isLoggingIn: false,
  hasLoggedIn: false,
  loginFailed: false,
};

export function loginReducer(
  state = initialState,
  action: LoginActions
): LoginData {
  switch (action.type) {
    case LoginActionTypes.ResetLoginPage: {
      return initialState;
    }

    case LoginActionTypes.AttemptLogin:
      return {
        ...state,
        email: action.email,
        password: action.password,
      };

    case LoginActionTypes.LoginRequest:
      return {
        ...state,
        isLoggingIn: true,
        hasLoggedIn: false,
        loginFailed: false,
      };

    default:
      return state;
  }
}
