import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { RouterModule, Route } from '@angular/router';
import { FuseModule } from '@reusable-parts/fuse';
import { ThemeModule } from '@reusable-parts/stateless/theme';
import { Auth0Module, Auth0Guard, AUTH0_CONFIG } from '@reusable-parts/logic/integration/auth0';
import { environment } from '../environments/environment';

const routes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [Auth0Guard],
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule),
  },
  {
    path: 'callback',
    loadChildren: () => import('./pages/callback/callback.module').then(m => m.CallbackModule),
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    Auth0Module,
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
    FuseModule.forRoot({ customScrollbars: true }),

    ThemeModule,
  ],
  providers: [{ provide: AUTH0_CONFIG, useValue: environment.auth0 }],
  bootstrap: [AppComponent],
})
export class AppModule {}
