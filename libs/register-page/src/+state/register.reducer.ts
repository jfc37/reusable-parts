import { Action } from '@ngrx/store';
import { RegisterActions, RegisterActionTypes } from './register.actions';

/**
 * Interface for the 'Register' data used in
 *  - RegisterState, and
 *  - registerReducer
 */
export interface RegisterData {
  name: string;
  email: string;
  password: string;

  isRegistering: boolean;
  hasRegistered: boolean;
  registerFailed: boolean;

  registerErrorMessage: string;
}

/**
 * Interface to the part of the Store containing RegisterState
 * and other information related to RegisterData.
 */
export interface RegisterState {
  readonly register: RegisterData;
}

export const initialState: RegisterData = {
  name: null,
  email: null,
  password: null,

  isRegistering: false,
  hasRegistered: false,
  registerFailed: false,

  registerErrorMessage: null,
};

export function registerReducer(
  state = initialState,
  action: RegisterActions
): RegisterData {
  switch (action.type) {
    case RegisterActionTypes.ResetRegisterPage: {
      return initialState;
    }

    case RegisterActionTypes.AttemptRegister: {
      return {
        ...state,
        name: action.name,
        email: action.email,
        password: action.password,
      };
    }

    case RegisterActionTypes.RegisterRequest: {
      return {
        ...state,
        isRegistering: true,
        hasRegistered: false,
        registerFailed: false,

        registerErrorMessage: null,
      };
    }

    case RegisterActionTypes.RegisterSuccess: {
      return {
        ...state,
        isRegistering: false,
        hasRegistered: true,
        registerFailed: false,

        registerErrorMessage: null,
      };
    }

    case RegisterActionTypes.RegisterFailure: {
      return {
        ...state,
        isRegistering: false,
        hasRegistered: false,
        registerFailed: true,

        registerErrorMessage: action.error,
      };
    }

    default:
      return state;
  }
}
