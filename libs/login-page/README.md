# Login Page

## Using Login Page in your app module

### Set up route
Add to routes
```{ path: 'login', loadChildren: '@reusable-parts/login-page#LoginPageModule' },```

### Set up Firebase

#### Install firebase and angular-firebase
```npm install angularfire2 firebase --save```

#### Create new firebase project
[https://console.firebase.google.com/u/0/](https://console.firebase.google.com/u/0/)

#### Add firebase config to environment
```
firebase: {
  apiKey: '<your-key>',
  authDomain: '<your-project-authdomain>',
  databaseURL: '<your-database-URL>',
  projectId: '<your-project-id>',
  storageBucket: '<your-storage-bucket>',
  messagingSenderId: '<your-messaging-sender-id>'
}
```

#### Add imports to module
```
AngularFireModule.initializeApp(environment.firebase),
AngularFireAuthModule,
```

### Set up Config
Add a provider
```
{
  provide: LOGIN_PAGE_CONFIG,
  useValue: {
    name: `some name`,
    description: `some description`
  } as LoginPageConfig
}
```
