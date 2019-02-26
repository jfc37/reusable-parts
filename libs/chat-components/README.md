# Chat components

## How to build

- find and replace under `chat-components/**`
  `'@reusable-parts/fuse` with `'jfc-fuse`
- `npm run build:chat`
- `cd dist/chat-components`
- `npm publish`

## Prerequest

- implement IChatFacade

## Issues consuming app needs to provide

- Styling on parent
  `:host { width: 100%; max-height: none; height: auto; overflow: auto; }`

- Need the following packages
  `"@angular/material": "7.2.1", "@angular/flex-layout": "7.0.0-beta.23", "@angular/cdk": "7.2.1", "perfect-scrollbar": "1.4.0",`
