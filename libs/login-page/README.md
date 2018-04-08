# Login Page

## Using Login Page in your app module

### Set up route
Add to routes
```{ path: 'login', loadChildren: '@reusable-parts/login-page#LoginPageModule' },```

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
