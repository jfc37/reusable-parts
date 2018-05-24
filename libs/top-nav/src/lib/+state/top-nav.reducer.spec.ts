import { TopNavLoaded } from './top-nav.actions';
import { topNavReducer, initialState } from './top-nav.reducer';

describe('topNavReducer', () => {
  it('should work', () => {
    const action: TopNavLoaded = new TopNavLoaded({});
    const actual = top - navReducer(initialState, action);
    expect(actual).toEqual({});
  });
});
