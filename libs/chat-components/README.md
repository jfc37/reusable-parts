# Chat components

## Prerequest

- implement IChatFacade
- put theme-default as a class on body tag

## Issues consuming app needs to provide

- Have to add material icons to index.html
  `<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />`

- Have to add `theme-default` class to body of index.html

- Have to import `RouterModule` even if no routing is used
  `RouterModule.forRoot([])`

- Styling on parent
  `:host { width: 100%; max-height: none; height: auto; overflow: auto; }`

- Need the following packages
  `"@angular/material": "7.2.1", "@angular/flex-layout": "7.0.0-beta.23", "@angular/cdk": "7.2.1", "perfect-scrollbar": "1.4.0",`
