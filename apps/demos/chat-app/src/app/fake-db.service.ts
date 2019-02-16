import { InMemoryDbService } from 'angular-in-memory-web-api';

export class FakeDbService implements InMemoryDbService {
  createDb(): any {
    return {
      // Chat
      'chat-contacts': ChatFakeDb.contacts,
      'chat-chats': ChatFakeDb.chats,
      'chat-user': ChatFakeDb.user,
    };
  }
}

export class ChatFakeDb {
  public static contacts = [
    {
      id: 'jOnhwUK14ZvoU4ZdN1Ff',
      name: 'Alice Freeman',
      avatar: 'http://angular-material.fusetheme.com/assets/images/avatars/alice.jpg',
      status: 'online',
      mood: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: '7wQms0Ow1Spn50Q18mjr',
      name: 'Arnold',
      avatar: 'assets/images/avatars/Arnold.jpg',
      status: 'do-not-disturb',
      mood: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 'SSgFA1VqRmilH04FlqPn',
      name: 'Josefina',
      avatar: 'http://angular-material.fusetheme.com/assets/images/avatars/Josefina.jpg',
      status: 'online',
      mood: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
  ];

  public static chats = [
    {
      id: '1725a680b3249760ea21de52',
      dialog: [
        {
          who: 'jOnhwUK14ZvoU4ZdN1Ff',
          message: 'Quickly come to the meeting room 1B, we have a big server issue',
          time: '2017-03-22T08:54:28.299Z',
        },
        {
          who: '7wQms0Ow1Spn50Q18mjr',
          message: 'I’m having breakfast right now, can’t you wait for 10 minutes?',
          time: '2017-03-22T08:55:28.299Z',
        },
        {
          who: 'jOnhwUK14ZvoU4ZdN1Ff',
          message: 'We are losing money! Quick!',
          time: '2017-03-22T09:00:28.299Z',
        },
        {
          who: '7wQms0Ow1Spn50Q18mjr',
          message: 'It’s not my money, you know. I will eat my breakfast and then I will come to the meeting room.',
          time: '2017-03-22T09:02:28.299Z',
        },
        {
          who: 'jOnhwUK14ZvoU4ZdN1Ff',
          message: 'You are the worst!',
          time: '2017-03-22T09:05:28.299Z',
        },
        {
          who: 'jOnhwUK14ZvoU4ZdN1Ff',
          message: 'We are losing money! Quick!',
          time: '2017-03-22T09:15:28.299Z',
        },
        {
          who: '7wQms0Ow1Spn50Q18mjr',
          message: 'It’s not my money, you know. I will eat my breakfast and then I will come to the meeting room.',
          time: '2017-03-22T09:20:28.299Z',
        },
        {
          who: 'jOnhwUK14ZvoU4ZdN1Ff',
          message: 'You are the worst!',
          time: '2017-03-22T09:22:28.299Z',
        },
        {
          who: 'jOnhwUK14ZvoU4ZdN1Ff',
          message: 'We are losing money! Quick!',
          time: '2017-03-22T09:25:28.299Z',
        },
        {
          who: '7wQms0Ow1Spn50Q18mjr',
          message: 'It’s not my money, you know. I will eat my breakfast and then I will come to the meeting room.',
          time: '2017-03-22T09:27:28.299Z',
        },
        {
          who: 'jOnhwUK14ZvoU4ZdN1Ff',
          message: 'You are the worst!',
          time: '2017-03-22T09:33:28.299Z',
        },
        {
          who: 'jOnhwUK14ZvoU4ZdN1Ff',
          message: 'We are losing money! Quick!',
          time: '2017-03-22T09:35:28.299Z',
        },
        {
          who: '7wQms0Ow1Spn50Q18mjr',
          message: 'It’s not my money, you know. I will eat my breakfast and then I will come to the meeting room.',
          time: '2017-03-22T09:45:28.299Z',
        },
        {
          who: 'jOnhwUK14ZvoU4ZdN1Ff',
          message: 'You are the worst!',
          time: '2017-03-22T10:00:28.299Z',
        },
      ],
    },
    {
      id: 'u2OSFz8t8P2q7ZA2MwTW',
      dialog: [
        {
          who: 'SSgFA1VqRmilH04FlqPn',
          message: 'Quickly come to the meeting room 1B, we have a big server issue',
          time: '2017-04-22T01:00:00.299Z',
        },
        {
          who: '7wQms0Ow1Spn50Q18mjr',
          message: 'I’m having breakfast right now, can’t you wait for 10 minutes?',
          time: '2017-04-22T01:05:00.299Z',
        },
        {
          who: 'SSgFA1VqRmilH04FlqPn',
          message: 'We are losing money! Quick!',
          time: '2017-04-22T01:10:00.299Z',
        },
      ],
    },
  ];

  public static user = [
    {
      id: '7wQms0Ow1Spn50Q18mjr',
      name: 'John Doe',
      avatar: 'assets/images/avatars/profile.jpg',
      status: 'online',
      mood: "it's a status....not your diary...",
      chatList: [
        {
          id: '1725a680b3249760ea21de52',
          contactId: 'jOnhwUK14ZvoU4ZdN1Ff',
          name: 'Alice Freeman',
          unread: 4,
          lastMessage: 'You are the worst!',
          lastMessageTime: '2017-06-12T02:10:18.931Z',
        },
        {
          id: 'u2OSFz8t8P2q7ZA2MwTW',
          contactId: 'SSgFA1VqRmilH04FlqPn',
          name: 'Josefina',
          unread: null,
          lastMessage: 'We are losing money! Quick!',
          lastMessageTime: '2017-02-18T10:30:18.931Z',
        },
      ],
    },
  ];
}
