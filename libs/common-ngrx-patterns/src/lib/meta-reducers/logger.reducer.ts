import { ActionReducer } from '@ngrx/store';

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state: any, action: any): any {
    console.groupCollapsed(action.type);
    console.log('Action:', action);

    const stateAfter = reducer(state, action);

    console.log('State after action:', stateAfter);
    console.groupEnd();

    return stateAfter;
  };
}
