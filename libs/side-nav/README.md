# Side Nav

## Using Side Nav in your app module
Side nav works with multiple languages so you need to provide translation mappings

### Install ngx-translate
```npm install @ngx-translate/core --save```

### Import into module
```TranslateModule.forRoot()```

### Set up translation
Create new file ```navigation/i18n/en.ts```
```
export const locale = {
  lang: 'en',
  data: {
      'NAV': {
          'APPLICATIONS': 'Applications',
          'DASHBOARDS'  : 'Dashboards',
          'MAIL'        : {
              'TITLE': 'Mail',
              'BADGE': '25'
          }
      }
  }
};
```

### Load translations into root component
```
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FuseTranslationLoaderService } from '@reusable-parts/@fuse/services/translation-loader.service';
import { locale as navigationEnglish } from './navigation/i18n/en';

@Component({
  selector: 'jfc-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(
      private translate: TranslateService,
      private fuseTranslationLoader: FuseTranslationLoaderService
  )
  {
      // Add languages
      this.translate.addLangs(['en']);

      // Set the default language
      this.translate.setDefaultLang('en');

      // Set the navigation translations
      this.fuseTranslationLoader.loadTranslations(navigationEnglish);

      // Use a language
      this.translate.use('en');
  }
}

```
