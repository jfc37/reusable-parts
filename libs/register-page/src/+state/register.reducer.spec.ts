import { RegisterLoaded } from './register.actions';
import { registerReducer, initialState } from './register.reducer';

describe('registerReducer', () => {
  it('should work', () => {
    const action: RegisterLoaded = new RegisterLoaded({});
    const actual = registerReducer(initialState, action);
    expect(actual).toEqual({});
  });
});
