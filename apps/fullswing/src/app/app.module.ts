import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NxModule } from '@nrwl/nx';
import { RouterModule, NoPreloading } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { TranslateModule } from '@ngx-translate/core';
import { FuseModule, FuseSharedModule } from '@reusable-parts/@fuse';
import { CommonPwaPartsModule } from '@reusable-parts/common-pwa-parts';
import { TopNavModule } from '@reusable-parts/top-nav';
import { SideNavModule } from '@reusable-parts/side-nav';
import { MainContentModule } from '@reusable-parts/main-content';
import { GuardsModule } from '@reusable-parts/guards';
import { StoreModule } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    NxModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    TranslateModule.forRoot(),

    // UI toolkit
    FuseModule.forRoot(environment.fuseConfig),
    FuseSharedModule,

    CommonPwaPartsModule,
    TopNavModule,
    SideNavModule,
    MainContentModule,

    GuardsModule,

    RouterModule.forRoot(
      [
        { path: '', pathMatch: 'full', redirectTo: 'login' },
        {
          path: 'login',
          loadChildren: '@reusable-parts/login-page#LoginPageModule',
        },
        {
          path: 'register',
          loadChildren: '@reusable-parts/register-page#RegisterPageModule',
        },
      ],
      { useHash: false, preloadingStrategy: NoPreloading }
    ),

    StoreModule.forRoot(
      {
        router: routerReducer,
      },
      { metaReducers: !environment.production ? [storeFreeze, logger] : [] }
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
    }),
    // StoreModule.forFeature('app', appReducer, {
    //   initialState: appInitialState,
    // }),
    // EffectsModule.forFeature([AppEffects]),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
