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
import { RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { ResetComponent } from './reset/reset.component';

@NgModule({
  declarations: [AppComponent, ChatComponent, ResetComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    NxModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,

    RouterModule.forRoot([
      { path: 'chat/:userId', component: ChatComponent },
      { path: 'reset', component: ResetComponent },
      { path: '', pathMatch: 'full', redirectTo: 'chat/aaa' },
    ]),

    ChatComponentsModule,
  ],
  providers: [{ provide: CHAT_FACADE, useClass: ChatFacade }],
  bootstrap: [AppComponent],
})
export class AppModule {}