import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule, INITIAL_STATE } from '@ngrx/store';
import {
  blockFeatureReducer,
  getInitialBlockFeatureState,
} from './block-feature.reducer';
import { blockFeatureEffects } from './block-feature.effects';
import { EffectsModule } from '@ngrx/effects';
import { BlockRepository } from './block.repository';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('blockFeature', blockFeatureReducer),
    EffectsModule.forFeature(blockFeatureEffects),
  ],
  providers: [
    ...blockFeatureEffects,
    BlockRepository,
    { provide: INITIAL_STATE, useFactory: getInitialBlockFeatureState },
  ],
})
export class BlockStateModule {}
