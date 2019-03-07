import { storiesOf, moduleMetadata } from '@storybook/angular';
import { StatelessWelcomeComponent } from '@reusable-parts/stateless/welcome';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FuseSharedModule } from '@reusable-parts/fuse';

storiesOf('Stateless Welcome', module)
  .addDecorator(
    moduleMetadata({
      // TODO: JOE StoryBook
      // imports: [StatelessWelcomeModule],
      imports: [CommonModule, BrowserAnimationsModule, FuseSharedModule],
      declarations: [StatelessWelcomeComponent],
    }),
  )
  .add('Default', () => ({
    component: StatelessWelcomeComponent,
  }))
  .add('with name', () => ({
    component: StatelessWelcomeComponent,
    props: {
      name: 'FishServe',
    },
  }))
  .add('with description', () => ({
    component: StatelessWelcomeComponent,
    props: {
      description: 'Come join us',
    },
  }))
  .add('with logo url', () => ({
    component: StatelessWelcomeComponent,
    props: {
      logoUrl: 'http://angular-material.fusetheme.com/assets/images/logos/fuse.svg',
    },
  }));
