import { Action } from '@ngrx/store';
import { Block } from '../block';

export enum BlocksActionTypes {
  Set = '[Blocks] Set',

  Remove = '[Blocks] Remove',
}

export class SetBlocks implements Action {
  public blocks: Block[];
  readonly type = BlocksActionTypes.Set;

  constructor(...blocks: Block[]) {
    this.blocks = blocks;
  }
}

export class RemoveBlock implements Action {
  readonly type = BlocksActionTypes.Remove;

  constructor(public id: string) {}
}

export type BlocksActions = SetBlocks | RemoveBlock;
