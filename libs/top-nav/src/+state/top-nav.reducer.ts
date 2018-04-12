import { Action } from '@ngrx/store';
import { TopNavActions, TopNavActionTypes } from './top-nav.actions';

/**
 * Interface for the 'TopNav' data used in
 *  - TopNavState, and
 *  - topNavReducer
 */
export interface TopNavData {}

/**
 * Interface to the part of the Store containing TopNavState
 * and other information related to TopNavData.
 */
export interface TopNavState {
  readonly topNav: TopNavData;
}

export const initialState: TopNavData = {};

export function topNavReducer(
  state = initialState,
  action: TopNavActions
): TopNavData {
  switch (action.type) {
    case TopNavActionTypes.TopNavAction:
      return state;

    case TopNavActionTypes.TopNavLoaded: {
      return { ...state, ...action.payload };
    }

    default:
      return state;
  }
}
