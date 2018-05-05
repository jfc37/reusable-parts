import { Action } from '@ngrx/store';
import { Block } from '../block';

export enum BlocksActionTypes {
  Set = '[Blocks] Set',
}

export class SetBlocks implements Action {
  public blocks: Block[];
  readonly type = BlocksActionTypes.Set;

  constructor(...blocks: Block[]) {
    this.blocks = blocks;
  }
}

export type BlocksActions = SetBlocks;
