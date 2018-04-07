import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NxModule } from '@nrwl/nx';
import { FuseModule } from '@reusable-parts/@fuse';
import { LoginModule } from '@reusable-parts/login';
import { RouterModule } from '@angular/router';
import { fuseConfig } from './fuse-config';

@NgModule({
  imports: [
    BrowserModule,
    NxModule.forRoot(),

    // UI toolkit
    FuseModule.forRoot(fuseConfig),

    // Login component
    LoginModule,

    RouterModule.forRoot([{path: 'login-page', loadChildren: '@reusable-parts/login-page#LoginPageModule'}])
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
