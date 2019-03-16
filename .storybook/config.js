import { configure, addParameters } from '@storybook/angular';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
});

function loadStories() {
  // load all from  /src/stories/*.stories.ts files
  const req = require.context('../libs', true, /\.stories\.ts$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
