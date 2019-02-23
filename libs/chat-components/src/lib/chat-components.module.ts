import { NgModule } from '@angular/core';
import { ChatComponent } from './chat.component';
import { ChatViewComponent } from './chat-view/chat-view.component';
import { ChatStartComponent } from './chat-start/chat-start.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatRadioModule,
  MatSidenavModule,
  MatToolbarModule,
} from '@angular/material';
import { FuseSharedModule, FuseModule } from '@reusable-parts/fuse';
import { ChatService } from './chat.service';
import { ChatChatsSidenavComponent } from './sidenavs/left/chats/chats.component';
import { ChatUserSidenavComponent } from './sidenavs/left/user/user.component';
import { ChatLeftSidenavComponent } from './sidenavs/left/left.component';
import { ChatRightSidenavComponent } from './sidenavs/right/right.component';
import { ChatContactSidenavComponent } from './sidenavs/right/contact/contact.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ChatComponent,
    ChatViewComponent,
    ChatStartComponent,
    ChatChatsSidenavComponent,
    ChatUserSidenavComponent,
    ChatLeftSidenavComponent,
    ChatRightSidenavComponent,
    ChatContactSidenavComponent,
  ],
  exports: [
    ChatComponent,
    ChatViewComponent,
    ChatStartComponent,
    ChatChatsSidenavComponent,
    ChatUserSidenavComponent,
    ChatLeftSidenavComponent,
    ChatRightSidenavComponent,
    ChatContactSidenavComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot([]),

    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatRadioModule,
    MatSidenavModule,
    MatToolbarModule,

    FuseSharedModule,
    FuseModule.forRoot({}),
  ],
  providers: [ChatService],
})
export class ChatComponentsModule {}
