import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NxModule } from '@nrwl/nx';
import { FuseModule } from '@reusable-parts/@fuse';

@NgModule({
  imports: [
    BrowserModule,
    NxModule.forRoot(),

    // UI toolkit
    FuseModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
