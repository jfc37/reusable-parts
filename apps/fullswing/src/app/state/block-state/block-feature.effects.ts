import { CreateBlockEffects } from './creating-block/creating-block.effects';
import { LoadingBlockPagesEffects } from './loading-block-pages/loading-block-pages.effects';
import { GeneratingBlockEffects } from './generating-block/generating-block.effects';
import { DeletingBlockEffects } from './deleting-block/deleting-block.effects';

export const blockFeatureEffects = [
  CreateBlockEffects,
  LoadingBlockPagesEffects,
  GeneratingBlockEffects,
  DeletingBlockEffects,
];
