import { Observable } from 'rxjs';

export const CHAT_FACADE = 'CHAT_FACADE';

export interface IChatFacade {
  contacts$: Observable<ChatContact[]>;
  chats$: Observable<Chat[]>;
  user$: Observable<ChatUser>;
}

export interface Chat {
  id: string;
  dialog: ChatDialog[];
}

export interface ChatDialog {
  message: string;
  time: Date;
  who: string;
}

export interface ChatUser {
  id: string;
  status: string;
  avatar: string;
  name: string;
  chatList: ChatSummary[];
}

export interface ChatContact {
  id: string;
  avatar: string;
  name: string;
  status: string;
  mood: string;
}

export interface ChatSummary {
  id: string;
  contactId: string;
  name: string;
  lastMessage?: string;
  lastMessageTime: Date;
  unread: number;
}
