import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoPreloading, RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EffectsModule } from '@ngrx/effects';
import {
  RouterStateSerializer,
  StoreRouterConnectingModule,
  routerReducer,
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateModule } from '@ngx-translate/core';
import { NxModule } from '@nrwl/nx';
import { FuseModule, FuseSharedModule } from '@reusable-parts/@fuse';
import {
  CustomRouterStateSerializer,
  logger,
} from '@reusable-parts/common-ngrx-patterns';
import { CommonPwaPartsModule } from '@reusable-parts/common-pwa-parts';
import { AuthenticatedGuard, GuardsModule } from '@reusable-parts/guards';
import { MainContentModule } from '@reusable-parts/main-content';
import { SideNavModule } from '@reusable-parts/side-nav';
import { TopNavModule } from '@reusable-parts/top-nav';
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

    GuardsModule,
    AuthorisationModule,

    RouterModule.forRoot(
      [
        { path: '', pathMatch: 'full', redirectTo: 'app' },
        {
          path: 'login',
          loadChildren: '@reusable-parts/login-page#LoginPageModule',
        },
        {
          path: 'register',
          loadChildren: '@reusable-parts/register-page#RegisterPageModule',
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
            { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
          ],
        },
      ],
      { useHash: false, preloadingStrategy: NoPreloading }
    ),

    StoreModule.forRoot(
      {
        router: routerReducer,
      },
      { metaReducers: !environment.production ? [logger] : [] }
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
    { provide: 'defaultNewUserRoles', useValue: getDefaultNewUserRoles() },
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
  ],
  declarations: [AppComponent, ShellComponent, DashboardComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}