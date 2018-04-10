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
import { AngularFireModule} from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    NxModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,

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
      { path: 'login', loadChildren: '@reusable-parts/login-page#LoginPageModule' },
      { path: 'register', loadChildren: '@reusable-parts/register-page#RegisterPageModule' },
      { path: 'dashboard', component: DashboardComponent },{path: 'register-page', loadChildren: '@reusable-parts/register-page#RegisterPageModule'}
    ], { useHash: false, preloadingStrategy: NoPreloading }),

    StoreModule.forRoot({},{ metaReducers : !environment.production ? [storeFreeze, logger] : [] }),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule
  ],
  providers: [
    loginPageConfig,
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
  ],
  declarations: [AppComponent, DashboardComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
