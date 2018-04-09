import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { DataPersistence } from '@nrwl/nx';
import { hot } from '@nrwl/nx/testing';

import { LoginEffects } from './login.effects';
import { LoadLogin, LoginLoaded } from './login.actions';

import { Observable } from 'rxjs/Observable';

describe('LoginEffects', () => {
  let actions$: Observable<any>;
  let effects$: LoginEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        LoginEffects,
        DataPersistence,
        provideMockActions(() => actions$)
      ]
    });

    effects$ = TestBed.get(LoginEffects);
  });

  describe('someEffect', () => {
    it('should work', () => {
      actions$ = hot('-a-|', { a: new LoadLogin({}) });
      expect(effects$.loadLogin$).toBeObservable(
        hot('-a-|', { a: new LoginLoaded({}) })
      );
    });
  });
});
