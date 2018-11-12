import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';
import { CommonUiComponentsModule } from '@reusable-parts/common-ui-components/src';
import { HomeComponent } from './home/home.component';
import { MatButtonModule } from '@angular/material';
import { FuseSharedModule, FuseModule } from '@reusable-parts/@fuse';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    CommonUiComponentsModule,
    NxModule.forRoot(),
    RouterModule.forRoot(
      [{ path: 'home', component: HomeComponent }, { path: '', pathMatch: 'full', redirectTo: 'home' }],
      { initialNavigation: 'enabled' },
    ),
    MatButtonModule,

    FuseModule.forRoot({}),
    FuseSharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
