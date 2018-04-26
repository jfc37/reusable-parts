# ReusableParts

A workspace containing reusable parts of applications leveraging nrwl/nx

## Creating a new page lib

`ng generate lib mymodule --routing --lazy --parentModule=apps/myapp/src/myapp.module.ts`

## Creating a new component

`ng generate component component/my-component --app=my-app`

## Creating ngrx feature state

`ng generate ngrx myFeature --module=libs/my-module/src/my-module.module.ts`

## Creating service

`ng generate service services/my-service --app=my-app`

## Deploy to TravisCI / Firebase

### Create travis file

Create `.travis.yml` file at root

```
language: node_js
node_js:
  - "8"
dist: trusty
sudo: false

cache:
  directories:
    - node_modules

before_script:
  - npm install -g firebase-tools

script:
  - ng build --prod

after_success:
  - firebase deploy --token $FIREBASE_TOKEN
```

### Configure Travis website

* Flick switch for new repo: https://travis-ci.org/profile/jfc37
* Go to settings for repo in travis
* Tick "Build only if .travis.yml is present
* Generate new token in github, selecting all checkboxes under "repo": https://github.com/settings/tokens
* Back in Travis, add environment variable key/value: `GIT HUB_TOKEN`/`<generated token>`

### Configure Firebase

* `npm install -g firebase-tools`
* `firebase login`
* `firebase init`. public directory - dist

#### Test deployment

* `ng build --prod`
* `firebase deploy`

#### Link Firebase with TravisCI

* `firebase login:ci`
* Copy token
* Under travis repo, add environment variable key/value: `FIREBASE_TOKEN`/`<generated token>`

## Setting up service worker

### Install package

`npm i @angular/service-worker`

### Enable service worker in CLI

`ng set apps.0.serviceWorker=true`

### Regiser service worker in main.ts

Need to do it in `main.ts` as firebase breaks if done in `app.module.ts`

```
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(() => {
    if ('serviceWorker' in navigator && environment.production) {
      navigator.serviceWorker.register('/ngsw-worker.js');
    }
  })
  .catch(err => console.log(err));
```

### Add config

Create file `src/ngsw-config.json`:

```
{
  "index": "/index.html",
  "assetGroups": [{
    "name": "app",
    "installMode": "prefetch",
    "resources": {
      "files": [
        "/favicon.ico",
        "/index.html"
      ],
      "versionedFiles": [
        "/*.bundle.css",
        "/*.bundle.js",
        "/*.chunk.js"
      ]
    }
  }, {
    "name": "assets",
    "installMode": "lazy",
    "updateMode": "prefetch",
    "resources": {
      "files": [
        "/assets/**"
      ]
    }
  }]
}
```
