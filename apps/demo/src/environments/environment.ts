import { Environment } from "./environment.interface";

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment: Environment = {
  production: false,

  firebase: {
    apiKey: "AIzaSyDQk_EXyWb1GuL81tsykdm2gqUMXpl7R98",
    authDomain: "seed-ui.firebaseapp.com",
    databaseURL: "https://seed-ui.firebaseio.com",
    projectId: "seed-ui",
    storageBucket: "seed-ui.appspot.com",
    messagingSenderId: "574589268724"
  }
};