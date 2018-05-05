import { Action } from '@ngrx/store';
import { Page, SortDirection } from '@reusable-parts/common-ngrx-patterns';

export enum BlockPagesActionTypes {
  Reset = '[Block Pages] Reset',

  Set = '[Block Pages] Set',

  ChangeSortOrder = '[Block Pages] Change Sort Order',
}

export class ResetBlockPages implements Action {
  readonly type = BlockPagesActionTypes.Reset;
}

export class SetBlockPage implements Action {
  readonly type = BlockPagesActionTypes.Set;

  constructor(public page: Page) {}
}

export class ChangeBlockSortOrder implements Action {
  readonly type = BlockPagesActionTypes.ChangeSortOrder;

  constructor(public orderBy: string, public sortDirection: SortDirection) {}
}

export type BlockPagesActions =
  | ResetBlockPages
  | SetBlockPage
  | ChangeBlockSortOrder;
