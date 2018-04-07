import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NxModule } from '@nrwl/nx';
import { FuseModule } from '@reusable-parts/@fuse';
import { LoginModule } from '@reusable-parts/login';

@NgModule({
  imports: [
    BrowserModule,
    NxModule.forRoot(),

    // UI toolkit
    FuseModule,

    // Login component
    LoginModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
