# Vallum POC

## Flow

1. User creates account with Auth0 (Auth0 hook creates user in Copper CRM)
2. User searches for themselves against the NZ Companies Register
3. User selects themselves, gets saved against user in Copper CRM

## Integration points

https://api.business.govt.nz/api/apis/info?name=Companies-Entity-Role-Search&version=v2&provider=mbiecreator

## Deployed to

https://vallum-truepic.firebaseapp.com

## External setup

1. create (Copper CRM account)[https://www.copper.com/]
2. generate Copper API key (Settings -> API Keys)
3. create Auth0 account
4. create hook to create user in Copper on registration
   a. browse to Auth0 Hooks
   b. create new Pre User Registration hook
   c. add axios@0.18.0 NPM module
   d. copy everything in `create-user-in-copper.js`, replacing `X-PW-AccessToken` and `X-PW-UserEmail` values
5. create (MBIE API account)['https://api.business.govt.nz/api/welcome']
6. subscribe for access to (Companies Entity Role Search
   API)['https://api.business.govt.nz/api/apis/info?name=Companies-Entity-Role-Search&version=v2&provider=mbiecreator]
