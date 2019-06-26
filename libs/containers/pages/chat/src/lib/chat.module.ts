import { NgModule } from '@angular/core';
import { ChatComponent } from './chat.component';
import { ChatViewComponent } from './chat-view/chat-view.component';
import { ChatStartComponent } from './chat-start/chat-start.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
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
  exports: [ChatComponent],
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
export class ChatModule {}
