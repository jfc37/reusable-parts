# Register Page

## Using Register Page in your app module

### Set up route

Add to routes
`{ path: 'register', loadChildren: '@reusable-parts/register-page#RegisterPageModule' },`

### Set up Firebase

#### Install firebase and angular-firebase

`npm install angularfire2 firebase --save`

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
AngularFirestoreModule,
```

### Set up Config

Register pages needs:

* environment config
* roles that should be given to a new user

```
{ provide: 'registerPageConfig', useValue: environment.registerPageConfig },
{ provide: 'defaultNewUserRoles', useValue: defaultNewUserRoles },
```
