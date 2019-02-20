import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoPreloading, RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EffectsModule } from '@ngrx/effects';
import { RouterStateSerializer, StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateModule } from '@ngx-translate/core';
import { NxModule } from '@nrwl/nx';
import { FuseModule, FuseSharedModule } from '@reusable-parts/fuse/src/lib/@fuse';
import { CustomRouterStateSerializer, logger } from '@reusable-parts/common-ngrx-patterns/src';
import { CommonPwaPartsModule } from '@reusable-parts/common-pwa-parts/src';
import { AuthenticatedGuard, GuardsModule } from '@reusable-parts/guards/src';
import { MainContentModule } from '@reusable-parts/main-content/src';
import { SideNavModule } from '@reusable-parts/side-nav/src';
import { TopNavModule } from '@reusable-parts/top-nav/src';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { ShellComponent } from './components/shell/shell.component';
import { getDefaultNewUserRoles } from './authorisation/roles';
import { AdminGuard } from './authorisation/admin.guard';
import { AuthorisationModule } from './authorisation/authorisation.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production,
    }),
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

    MatNativeDateModule,

    GuardsModule,
    AuthorisationModule,

    RouterModule.forRoot(
      [
        { path: '', pathMatch: 'full', redirectTo: 'app' },
        {
          path: 'login',
          loadChildren: '@reusable-parts/login-page/src#LoginPageModule',
        },
        {
          path: 'register',
          loadChildren: '@reusable-parts/register-page/src#RegisterPageModule',
        },
        {
          path: 'forgot-password',
          loadChildren: '@reusable-parts/forgot-password-page/src#ForgotPasswordPageModule',
        },
        {
          path: 'app',
          component: ShellComponent,
          canActivate: [AuthenticatedGuard],
          children: [
            { path: 'dashboard', component: DashboardComponent },
            {
              path: 'admin',
              canActivate: [AdminGuard],
              loadChildren: './admin/admin.module#AdminModule',
            },
            {
              path: 'enrol',
              loadChildren: './enrol/enrol.module#EnrolModule',
            },
            { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
          ],
        },
      ],
      { useHash: false, preloadingStrategy: NoPreloading },
    ),

    StoreModule.forRoot(
      {
        router: routerReducer,
      },
      { metaReducers: !environment.production ? [logger] : [] },
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
    }),
  ],
  providers: [
    { provide: 'unauthenticatedRedirectRoute', useValue: 'login' },
    { provide: 'loginPageConfig', useValue: environment.loginPageConfig },
    { provide: 'registerPageConfig', useValue: environment.registerPageConfig },
    { provide: 'forgotPasswordPageConfig', useValue: environment.forgotPasswordPageConfig },
    { provide: 'defaultNewUserRoles', useValue: getDefaultNewUserRoles() },
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
    { provide: MAT_DATE_LOCALE, useValue: 'en-NZ' },
  ],
  declarations: [AppComponent, ShellComponent, DashboardComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
