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
import { NxModule } from '@nrwl/nx';
import { FuseModule, FuseSharedModule } from '@reusable-parts/@fuse';
import { TopNavModule } from '@reusable-parts/top-nav';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { fuseConfig, loginPageConfig, registerPageConfig } from './app.config';
import { CustomRouterStateSerializer, logger } from './custom-route.state';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { GuardsModule } from '@reusable-parts/guards';
import { AuthenticatedGuard } from '@reusable-parts/guards/src/authenticated/authenticated.guard';
import { SideNavModule } from '@reusable-parts/side-nav';
import { FuseConfigService } from '@reusable-parts/@fuse/services/config.service';
import { TranslateModule } from '@ngx-translate/core';
import { MainContentModule } from '@reusable-parts/main-content';

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
    FuseModule.forRoot(fuseConfig),
    FuseSharedModule,

    TopNavModule,
    SideNavModule,
    MainContentModule,

    GuardsModule,

    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'login', loadChildren: '@reusable-parts/login-page#LoginPageModule' },
      { path: 'register', loadChildren: '@reusable-parts/register-page#RegisterPageModule' },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthenticatedGuard],
      },
    ], { useHash: false, preloadingStrategy: NoPreloading }),

    StoreModule.forRoot({},{ metaReducers : !environment.production ? [storeFreeze, logger] : [] }),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule
  ],
  providers: [
    { provide: 'unauthenticatedRedirectRoute', useValue: 'login'},
    { provide: 'loginPageConfig', useValue: loginPageConfig},
    { provide: 'registerPageConfig', useValue: registerPageConfig},
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
  ],
  declarations: [AppComponent, DashboardComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
