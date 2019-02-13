import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { ChatComponentsModule, CHAT_FACADE } from '@reusable-parts/chat-components';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FakeDbService } from './fake-db.service';
import { ChatFacade } from './chat.facade';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    NxModule.forRoot(),

    InMemoryWebApiModule.forRoot(FakeDbService, {
      delay: 0,
      passThruUnknownUrl: true,
    }),
    ChatComponentsModule,
  ],
  providers: [{ provide: CHAT_FACADE, useClass: ChatFacade }],
  bootstrap: [AppComponent],
})
export class AppModule {}
