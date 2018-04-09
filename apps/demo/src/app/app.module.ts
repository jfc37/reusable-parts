import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoPreloading, RouterModule, LoadChildrenCallback } from '@angular/router';
import { NxModule } from '@nrwl/nx';
import { FuseModule, FuseSharedModule } from '@reusable-parts/@fuse';
import { AppComponent } from './app.component';
import { MatCheckboxModule, MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { fuseConfig, loginPageConfig } from './app.config';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';
import { CustomRouterStateSerializer, logger } from './custom-route.state';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    NxModule.forRoot(),

    // angular material components
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,

    // UI toolkit
    FuseModule.forRoot(fuseConfig),
    FuseSharedModule,

    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', loadChildren: '@reusable-parts/login-page#LoginPageModule' }
    ], { useHash: false, preloadingStrategy: NoPreloading }),

    // storeFreeze and StoreRouterConnectingModule don't play nice right now
    // https://github.com/ngrx/platform/issues/183
    StoreModule.forRoot({},{ metaReducers : !environment.production ? [storeFreeze, logger] : [] }),
    // StoreModule.forRoot({}),

    EffectsModule.forRoot([]),

    !environment.production ? StoreDevtoolsModule.instrument() : [],

    StoreRouterConnectingModule
  ],
  providers: [
    loginPageConfig,
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
