import { Action } from '@ngrx/store';

export enum TopNavActionTypes {
  TopNavAction = '[TopNav] Action',
  LoadTopNav = '[TopNav] Load Data',
  TopNavLoaded = '[TopNav] Data Loaded'
}

export class TopNav implements Action {
  readonly type = TopNavActionTypes.TopNavAction;
}
export class LoadTopNav implements Action {
  readonly type = TopNavActionTypes.LoadTopNav;
  constructor(public payload: any) {}
}

export class TopNavLoaded implements Action {
  readonly type = TopNavActionTypes.TopNavLoaded;
  constructor(public payload: any) {}
}

export type TopNavActions = TopNav | LoadTopNav | TopNavLoaded;
