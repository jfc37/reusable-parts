import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { RouterModule, Route } from '@angular/router';
import { FuseModule } from '@reusable-parts/fuse';
import { ThemeModule } from '@reusable-parts/stateless/theme';
import { Auth0Module, Auth0Guard, AUTH0_CONFIG } from '@reusable-parts/logic/integration/auth0';
import { environment } from '../environments/environment';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig } from '@angular/material';

const routes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'dashboard',
    loadChildren: './pages/dashboard/dashboard.module#DashboardModule',
    canActivate: [Auth0Guard],
  },
  {
    path: 'policy-documents',
    loadChildren: './pages/policy-documents/policy-documents.module#PolicyDocumentsModule',
    canActivate: [Auth0Guard],
  },
  {
    path: 'welcome',
    loadChildren: './pages/welcome/welcome.module#WelcomeModule',
  },
  {
    path: 'callback',
    loadChildren: './pages/callback/callback.module#CallbackModule',
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
  providers: [
    { provide: AUTH0_CONFIG, useValue: environment.auth0 },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5000 } },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } as MatDialogConfig },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
