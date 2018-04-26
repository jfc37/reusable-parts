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
  rememberMe: boolean;

  isLoggingIn: boolean;
  hasLoggedIn: boolean;
  loginFailed: boolean;

  loginErrorMessage: string;
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
  rememberMe: false,

  isLoggingIn: false,
  hasLoggedIn: false,
  loginFailed: false,

  loginErrorMessage: null,
};

export function loginReducer(
  state = initialState,
  action: LoginActions
): LoginData {
  switch (action.type) {
    case LoginActionTypes.ResetLoginPage: {
      return initialState;
    }

    case LoginActionTypes.AttemptLogin: {
      return {
        ...state,
        email: action.email,
        password: action.password,
        rememberMe: action.rememberMe,
      };
    }

    case LoginActionTypes.LoginRequest: {
      return {
        ...state,
        isLoggingIn: true,
        hasLoggedIn: false,
        loginFailed: false,

        loginErrorMessage: null,
      };
    }

    case LoginActionTypes.LoginSuccess: {
      return {
        ...state,
        isLoggingIn: false,
        hasLoggedIn: true,
        loginFailed: false,

        loginErrorMessage: null,
      };
    }

    case LoginActionTypes.LoginFailure: {
      return {
        ...state,
        isLoggingIn: false,
        hasLoggedIn: false,
        loginFailed: true,

        loginErrorMessage: action.error,
      };
    }

    default:
      return state;
  }
}
