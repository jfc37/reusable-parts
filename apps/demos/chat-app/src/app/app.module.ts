import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { ChatComponentsModule } from '@reusable-parts/chat-components';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NxModule.forRoot(), ChatComponentsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
