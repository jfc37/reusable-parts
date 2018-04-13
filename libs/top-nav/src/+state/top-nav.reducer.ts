import { Action } from '@ngrx/store';
import { TopNavActions, TopNavActionTypes } from './top-nav.actions';

/**
 * Interface for the 'TopNav' data used in
 *  - TopNavState, and
 *  - topNavReducer
 */
export interface TopNavData {
  authenticated: boolean;
  displayName: string;
  avatarUrl: string;

  loading: boolean;
  loggingOut: boolean;
  loggedOut: boolean;
}

/**
 * Interface to the part of the Store containing TopNavState
 * and other information related to TopNavData.
 */
export interface TopNavState {
  readonly topNav: TopNavData;
}

export const initialState: TopNavData = {
  loading: true,

  authenticated: false,
  displayName: null,
  avatarUrl: null,
  loggingOut: false,
  loggedOut: false,
};

export function topNavReducer(
  state = initialState,
  action: TopNavActions
): TopNavData {
  switch (action.type) {
    case TopNavActionTypes.GetUser: {
      return initialState;
    }

    case TopNavActionTypes.Authenticated: {
      return {
        ...state,
        loading: false,
        authenticated: true,
        displayName: action.displayName,
        avatarUrl: action.avatarUrl || 'assets/images/avatars/profile.jpg',
      };
    }

    case TopNavActionTypes.Unauthenticated: {
      return {
        ...state,
        loading: false,
        authenticated: false,
        displayName: null,
        avatarUrl: null,
      };
    }

    case TopNavActionTypes.LoggingOut: {
      return {
        ...state,
        loggingOut: true,
        loggedOut: false,
      };
    }

    case TopNavActionTypes.LoggedOut: {
      return {
        ...state,
        loggingOut: false,
        loggedOut: true,
      };
    }

    default:
      return state;
  }
}
