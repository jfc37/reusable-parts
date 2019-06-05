import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { RouterModule, Route } from '@angular/router';
import { FuseModule } from '@reusable-parts/fuse';
import { ThemeModule } from '@reusable-parts/stateless/theme';
import { Auth0Module, Auth0Guard, AUTH0_CONFIG, Auth0Interceptor } from '@reusable-parts/logic/integration/auth0';
import { environment } from '../environments/environment';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig } from '@angular/material';
import { AWS_FILE_UPLOAD_CONFIG } from '@reusable-parts/logic/integration/aws-file-upload';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
    HttpClientModule,

    RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
    FuseModule.forRoot({ customScrollbars: true }),

    Auth0Module,
    ThemeModule,
  ],
  providers: [
    { provide: AUTH0_CONFIG, useValue: environment.auth0 },
    { provide: AWS_FILE_UPLOAD_CONFIG, useValue: environment.awsFileUploadConfig },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5000 } },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } as MatDialogConfig },
    { provide: HTTP_INTERCEPTORS, useClass: Auth0Interceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
