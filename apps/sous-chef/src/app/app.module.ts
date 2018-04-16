import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoPreloading, RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateModule } from '@ngx-translate/core';
import { NxModule } from '@nrwl/nx';
import { FuseModule, FuseSharedModule } from '@reusable-parts/@fuse';
import { GuardsModule } from '@reusable-parts/guards';
import { MainContentModule } from '@reusable-parts/main-content';
import { SideNavModule } from '@reusable-parts/side-nav';
import { TopNavModule } from '@reusable-parts/top-nav';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { CustomRouterStateSerializer, logger } from './custom-route.state';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    NxModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    TranslateModule.forRoot(),

    // angular material components
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,

    // UI toolkit
    FuseModule.forRoot(environment.fuseConfig),
    FuseSharedModule,

    TopNavModule,
    SideNavModule,
    MainContentModule,

    GuardsModule,

    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', loadChildren: '@reusable-parts/login-page#LoginPageModule' },
      { path: 'register', loadChildren: '@reusable-parts/register-page#RegisterPageModule' },
    ], { useHash: false, preloadingStrategy: NoPreloading }),

    StoreModule.forRoot({},{ metaReducers : !environment.production ? [storeFreeze, logger] : [] }),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule
  ],
  providers: [
    { provide: 'unauthenticatedRedirectRoute', useValue: 'login'},
    { provide: 'loginPageConfig', useValue: environment.loginPageConfig},
    { provide: 'registerPageConfig', useValue: environment.registerPageConfig},
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
