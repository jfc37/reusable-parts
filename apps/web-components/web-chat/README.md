# Web Chat

## To build

`npm run package:web-chat`
Take file living in `dist/apps/web-components/web-chat/web-chat-element.js`

## To use

Include script
`<script type="text/javascript" src="web-chat-element.js"></script>`
Define chat service

```
chatService = {
  contacts$: rxjs.of([]),
  chats$: rxjs.of([]),
  user$: rxjs.of({ chatList: [] }),
  allUsers$: rxjs.of([]),
  loadAllData: () => {
    return rxjs.of(null);
  },
  createChat: contactId => {
    return rxjs.of(null);
  },
  updateChat: chat => {
    return rxjs.of(null);
  },
  updateUser: user => {
    return rxjs.of(null);
  }
};
```

Insert chat element into dom

```
var link = document.createElement("web-chat");
link.service = chatService;
var parent = document.querySelector("body");
parent.insertBefore(link, parent.firstChild);
```
