import { configure } from '@storybook/angular';

function loadStories() {
  require('../libs/storybook/src/index.ts');
}

configure(loadStories, module);
