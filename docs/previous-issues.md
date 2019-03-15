# Previous issues and how to solve them

## Ngrx state not initialised for prod or aot builds

### Solution

Remove initial state from `Store.fromFeature(..)`
Replace with provider:
`{ provide: INITIAL_STATE, useFactory: someFunctionReturningInitialState> },`

## After deploying to firebase, app doesn't appear

### Solution

add `/index.html` at the end and browse

## Building a library that depends on another library

### Solution

Build the dependent library (`ng build fuse`)
Copy built folder from `dist` and copy to `node_modules`, renaming to `fuse`
Add path reference in main library's tsconfig.lib.json
`"paths": { "@reusable-parts/fuse": ["node_modules/@reusable-parts/fuse"] },`

## Scrolling of child not appearing / child height exceeding parent height

### Solution

Use stretch: fxLayoutAlign="start stretch"
Add style `height: 100%;`
