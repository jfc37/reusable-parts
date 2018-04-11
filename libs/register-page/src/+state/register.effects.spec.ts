import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { DataPersistence } from '@nrwl/nx';
import { hot } from '@nrwl/nx/testing';

import { RegisterEffects } from './register.effects';
import { LoadRegister, RegisterLoaded } from './register.actions';

import { Observable } from 'rxjs/Observable';

describe('RegisterEffects', () => {
  let actions$: Observable<any>;
  let effects$: RegisterEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        RegisterEffects,
        DataPersistence,
        provideMockActions(() => actions$)
      ]
    });

    effects$ = TestBed.get(RegisterEffects);
  });

  describe('someEffect', () => {
    it('should work', () => {
      actions$ = hot('-a-|', { a: new LoadRegister({}) });
      expect(effects$.loadRegister$).toBeObservable(
        hot('-a-|', { a: new RegisterLoaded({}) })
      );
    });
  });
});
