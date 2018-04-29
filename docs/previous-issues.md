# Previous issues and how to solve them

## Ngrx state not initialised for prod or aot builds

### Solution

Remove initial state from `Store.fromFeature(..)`
Replace with provider:
`{ provide: INITIAL_STATE, useFactory: someFunctionReturningInitialState> },`
