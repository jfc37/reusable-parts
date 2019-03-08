import { configure } from '@storybook/angular';

function loadStories() {
  // load all from  /src/stories/*.stories.ts files
  const req = require.context('../libs/storybook', true, /\.stories\.ts$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
