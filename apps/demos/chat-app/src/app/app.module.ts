import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { ChatComponentsModule, CHAT_FACADE } from '@reusable-parts/chat-components';
import { HttpClientModule } from '@angular/common/http';
import { ChatFacade } from './chat.facade';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    NxModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,

    ChatComponentsModule,
  ],
  providers: [{ provide: CHAT_FACADE, useClass: ChatFacade }],
  bootstrap: [AppComponent],
})
export class AppModule {}
