import { Action } from '@ngrx/store';
import { ResetActions, ResetActionTypes } from './reset.actions';

/**
 * Interface for the 'Reset' data used in
 *  - ResetState, and
 *  - resetReducer
 */
export interface ResetData {
  email: string;

  isResetting: boolean;
  hasReset: boolean;
  resetFailed: boolean;

  resetErrorMessage: string;
}

/**
 * Interface to the part of the Store containing ResetState
 * and other information related to ResetData.
 */
export interface ResetState {
  readonly reset: ResetData;
}

export const resetInitialState: ResetData = {
  email: null,

  isResetting: false,
  hasReset: false,
  resetFailed: false,

  resetErrorMessage: null,
};

export function resetReducer(state = resetInitialState, action: ResetActions): ResetData {
  switch (action.type) {
    case ResetActionTypes.ResetForgotPasswordPage: {
      return resetInitialState;
    }

    case ResetActionTypes.AttemptReset: {
      return {
        ...state,
        email: action.email,
      };
    }

    case ResetActionTypes.ResetRequest: {
      return {
        ...state,
        isResetting: true,
        hasReset: false,
        resetFailed: false,

        resetErrorMessage: null,
      };
    }

    case ResetActionTypes.ResetSuccess: {
      return {
        ...state,
        isResetting: false,
        hasReset: true,
        resetFailed: false,

        resetErrorMessage: null,
      };
    }

    case ResetActionTypes.ResetFailure: {
      return {
        ...state,
        isResetting: false,
        hasReset: false,
        resetFailed: true,

        resetErrorMessage: action.error,
      };
    }

    default:
      return state;
  }
}
