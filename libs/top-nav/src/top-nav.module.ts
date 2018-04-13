import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatMenuModule, MatProgressBarModule, MatToolbarModule, MatProgressSpinnerModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@reusable-parts/@fuse';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { DumbTopNavComponent } from './components/dumb-top-nav/dumb-top-nav.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { topNavReducer, initialState as topNavInitialState } from './+state/top-nav.reducer';
import { FirebaseUserService } from '@reusable-parts/top-nav/src/services/firebase-user.service';
import { TopNavEffects } from '@reusable-parts/top-nav/src/+state/top-nav.effects';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatToolbarModule,

    FuseSharedModule,

    StoreModule.forFeature('topNav', topNavReducer, { initialState: topNavInitialState }),

    EffectsModule.forFeature([TopNavEffects])
  ],
  declarations: [TopNavComponent, DumbTopNavComponent],
  exports: [TopNavComponent],
  providers: [
    FirebaseUserService,
    TopNavEffects,
  ],
})
export class TopNavModule { }
