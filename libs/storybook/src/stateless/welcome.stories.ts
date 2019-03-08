import { storiesOf, moduleMetadata } from '@storybook/angular';
import { StatelessWelcomeModule } from '@reusable-parts/stateless/welcome';

storiesOf('Stateless Welcome', module)
  .addDecorator(
    moduleMetadata({
      imports: [StatelessWelcomeModule],
    }),
  )
  .add('Default', () => ({
    template: `<stateless-welcome></stateless-welcome>`,
  }))
  .add('with name', () => ({
    template: `<stateless-welcome name="FishServe"></stateless-welcome>`,
  }))
  .add('with description', () => ({
    template: `<stateless-welcome description="Come join us"></stateless-welcome>`,
  }))
  .add('with logo url', () => ({
    template: `<stateless-welcome logoUrl="http://angular-material.fusetheme.com/assets/images/logos/fuse.svg"></stateless-welcome>`,
  }));
