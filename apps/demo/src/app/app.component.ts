import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FuseTranslationLoaderService } from '@reusable-parts/@fuse/services/translation-loader.service';
import { locale as navigationEnglish } from './navigation/i18n/en';

@Component({
  selector: 'jfc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public appName = `Barber's Shop`;
  public logoUrl = 'assets/images/logos/fuse.svg';
  public menuItems = [
    {
      'id': 'meals',
      'title': 'Meals',
      'type': 'group',
      'icon': 'apps',
    },
  ];

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
