# ReusableParts

A workspace containing reusable parts of applications leveraging nrwl/nx

## Creating a new page lib
```ng generate lib mymodule --routing --lazy --parentModule=apps/myapp/src/myapp.module.ts```

## Creating a new component
```ng generate component component/my-component --app=my-app```

## Creating ngrx feature state
```ng generate ngrx myFeature --module=libs/my-module/src/my-module.module.ts```

## Creating service
```ng generate service services/my-service --app=my-app```

## Deploy to TravisCI / Firebase

### Create travis file
Create ```.travis.yml``` file at root
```
language: node_js
node_js:
  - "8"
dist: trusty
sudo: false

cache:
  directories:
    - node_modules

addons:
  chrome: stable

script:
  - ng build --app=sous-chef
```

### Configure Travis website
- Flick switch for new repo: https://travis-ci.org/profile/jfc37
- Go to settings for repo in travis
- Tick "Build only if .travis.yml is present
- Generate new token in github, selecting all checkboxes under "repo": https://github.com/settings/tokens
- Back in Travis, add environment variable key/value: ```GIT HUB_TOKEN```/```<generated token>```



