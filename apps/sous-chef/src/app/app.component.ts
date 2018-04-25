import { Component, OnInit, Injectable } from '@angular/core';
import { MenuItem, MenuItemType } from '@reusable-parts/side-nav';
import { TranslateService } from '@ngx-translate/core';
import { FuseTranslationLoaderService } from '@reusable-parts/@fuse/services/translation-loader.service';
import { locale as navigationEnglish } from './navigation/i18n/en';
import { SwUpdate, SwPush } from '@angular/service-worker';
import { switchMap } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';
import { fromPromise } from 'rxjs/observable/fromPromise';

@Component({
  selector: 'jfc-app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(
    private translate: TranslateService,
    private fuseTranslationLoader: FuseTranslationLoaderService
  ) {
    this.translate.addLangs(['en']);
    this.translate.setDefaultLang('en');
    this.fuseTranslationLoader.loadTranslations(navigationEnglish);
    this.translate.use('en');
  }
}
