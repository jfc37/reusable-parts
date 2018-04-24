import { Component, OnInit, Injectable } from '@angular/core';
import { MenuItem, MenuItemType } from '@reusable-parts/side-nav';
import { TranslateService } from '@ngx-translate/core';
import { FuseTranslationLoaderService } from '@reusable-parts/@fuse/services/translation-loader.service';
import { locale as navigationEnglish } from './navigation/i18n/en';
import { SwUpdate, SwPush } from '@angular/service-worker';

@Injectable()
export class LogUpdateService {
  constructor(updates: SwUpdate, push: SwPush) {
    console.error('xxx in constructor');

    push.messages.subscribe(console.error.bind(null, '...messages'));
    push.subscription.subscribe(console.error.bind(null, '...subscription'));

    updates.available.subscribe(event => {
      console.log('current version is', event.current);
      console.log('available version is', event.available);
    });
    updates.activated.subscribe(event => {
      console.log('old version was', event.previous);
      console.log('new version is', event.current);
    });
  }
}

@Component({
  selector: 'jfc-app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(
    private translate: TranslateService,
    private fuseTranslationLoader: FuseTranslationLoaderService,
    private logUpdate: LogUpdateService
  ) {
    this.translate.addLangs(['en']);
    this.translate.setDefaultLang('en');
    this.fuseTranslationLoader.loadTranslations(navigationEnglish);
    this.translate.use('en');
  }
}
