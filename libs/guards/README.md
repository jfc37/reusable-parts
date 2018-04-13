# Guards

## Authentication Guard
Checks if user is authenticated with firebase.

### Set up Config
Add a provider
```{ provide: 'unauthenticatedRedirectRoute', useValue: 'login'}```

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
