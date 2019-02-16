import { Observable } from 'rxjs';

export const CHAT_FACADE = 'CHAT_FACADE';

export interface IChatFacade {
  contacts$: Observable<ChatContact[]>;
  chats$: Observable<Chat[]>;
  user$: Observable<ChatUser>;
  allUsers$: Observable<ChatUser[]>;

  loadAllData(): Observable<any>;
  createChat(contactId: string): Observable<string>;
  updateChat(chat: Chat): Observable<void>;
  updateUser(user: ChatUser): Observable<void>;
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
  status: UserStatus;
  avatar: string;
  name: string;
  mood: string;
  chatList: ChatSummary[];
}

export enum UserStatus {
  Online = 'online',
  DoNotDisturb = 'do-not-disturb',
  Away = 'away',
  Offline = 'offline',
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
  lastMessage?: string;
  lastMessageTime: Date;
  unread: number;
}
