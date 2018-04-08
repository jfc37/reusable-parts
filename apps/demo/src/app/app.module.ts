import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoPreloading, RouterModule } from '@angular/router';
import { NxModule } from '@nrwl/nx';
import { FuseModule, FuseSharedModule } from '@reusable-parts/@fuse';
import { AppComponent } from './app.component';
import { fuseConfig } from './fuse-config';
import { MatCheckboxModule, MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';

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
      { path: '', pathMatch: 'full', redirectTo: 'login-page' },
      { path: 'login-page', loadChildren: '@reusable-parts/login-page#LoginPageModule' },
    ], { useHash: false, preloadingStrategy: NoPreloading })
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
