# ReusableParts

A workspace containing reusable parts of applications leveraging nrwl/nx

## Creating a new page lib
```ng generate lib mymodule --routing --lazy --parentModule=apps/myapp/src/myapp.module.ts```

## Creating a new component
```ng generate component component/my-component --app=my-app```

## Creating ngrx feature state
```ng generate ngrx myFeature --module=libs/my-module/src/my-module.module.ts```
