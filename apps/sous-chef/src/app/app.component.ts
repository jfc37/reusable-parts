import { Component, OnInit } from '@angular/core';
import { MenuItem, MenuItemType } from '@reusable-parts/side-nav';
import { TranslateService } from '@ngx-translate/core';
import { FuseTranslationLoaderService } from '@reusable-parts/@fuse/services/translation-loader.service';
import { locale as navigationEnglish } from './navigation/i18n/en';

@Component({
  selector: 'jfc-app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(
    private translate: TranslateService,
    private fuseTranslationLoader: FuseTranslationLoaderService
  ) {
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
