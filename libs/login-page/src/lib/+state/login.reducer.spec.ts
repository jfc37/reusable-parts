import { LoginLoaded } from './login.actions';
import { loginReducer, initialState } from './login.reducer';

describe('loginReducer', () => {
  it('should work', () => {
    const action: LoginLoaded = new LoginLoaded({});
    const actual = loginReducer(initialState, action);
    expect(actual).toEqual({});
  });
});
