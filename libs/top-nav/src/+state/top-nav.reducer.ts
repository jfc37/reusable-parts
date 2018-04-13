import { Action } from '@ngrx/store';
import { TopNavActions, TopNavActionTypes } from './top-nav.actions';

/**
 * Interface for the 'TopNav' data used in
 *  - TopNavState, and
 *  - topNavReducer
 */
export interface TopNavData {
  loading: boolean;
  loggedIn: boolean;
  displayName: string;
  avatarUrl: string;
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
  loggedIn: false,
  displayName: null,
  avatarUrl: null,
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
        loggedIn: true,
        displayName: action.displayName,
        avatarUrl: action.avatarUrl || 'assets/images/avatars/profile.jpg',
      };
    }

    case TopNavActionTypes.Unauthenticated: {
      return {
        ...state,
        loading: false,
        loggedIn: false,
        displayName: null,
        avatarUrl: null,
      };
    }

    default:
      return state;
  }
}
