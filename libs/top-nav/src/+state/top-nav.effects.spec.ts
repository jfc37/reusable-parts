import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { DataPersistence } from '@nrwl/nx';
import { hot } from '@nrwl/nx/testing';

import { TopNavEffects } from './top-nav.effects';
import { LoadTopNav, TopNavLoaded } from './top-nav.actions';

import { Observable } from 'rxjs/Observable';

describe('TopNavEffects', () => {
  let actions$: Observable<any>;
  let effects$: TopNavEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        TopNavEffects,
        DataPersistence,
        provideMockActions(() => actions$)
      ]
    });

    effects$ = TestBed.get(TopNavEffects);
  });

  describe('someEffect', () => {
    it('should work', () => {
      actions$ = hot('-a-|', { a: new LoadTopNav({}) });
      expect(effects$.loadTopNav$).toBeObservable(
        hot('-a-|', { a: new TopNavLoaded({}) })
      );
    });
  });
});
