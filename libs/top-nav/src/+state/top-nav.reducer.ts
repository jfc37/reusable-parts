import { Action } from '@ngrx/store';
import { TopNavActions, TopNavActionTypes } from './top-nav.actions';

/**
 * Interface for the 'TopNav' data used in
 *  - TopNavState, and
 *  - topNavReducer
 */
export interface TopNavData {
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
  loggedIn: false,
  displayName: null,
  avatarUrl: 'assets/images/avatars/profile.jpg',
};

export function topNavReducer(
  state = initialState,
  action: TopNavActions
): TopNavData {
  switch (action.type) {
    case TopNavActionTypes.Initialise: {
      return initialState;
    }

    case TopNavActionTypes.SetLoginStatus: {
      return {
        ...state,
        loggedIn: action.isLoggedIn
      };
    }

    case TopNavActionTypes.SetDisplayName: {
      return {
        ...state,
        displayName: action.displayName
      };
    }

    case TopNavActionTypes.SetAvatarUrl: {
      return {
        ...state,
        avatarUrl: action.avatarUrl
      };
    }

    default:
      return state;
  }
}
