import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatMenuModule, MatProgressBarModule, MatToolbarModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@reusable-parts/@fuse';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { DumbTopNavComponent } from './components/dumb-top-nav/dumb-top-nav.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { topNavReducer, initialState as topNavInitialState } from './+state/top-nav.reducer';
import { TopNavEffects } from './+state/top-nav.effects';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatProgressBarModule,
    MatToolbarModule,

    FuseSharedModule,

    StoreModule.forFeature('topNav', topNavReducer, { initialState: topNavInitialState }),

    EffectsModule.forFeature([TopNavEffects]),
  ],
  declarations: [TopNavComponent, DumbTopNavComponent],
  exports: [TopNavComponent],
  providers: [TopNavEffects],
})
export class TopNavModule { }
