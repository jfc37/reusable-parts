import { storiesOf, moduleMetadata } from '@storybook/angular';
import { StatelessUserToolbarModule } from '@reusable-parts/stateless/user-toolbar';

storiesOf('Stateless User Toolbar', module)
  .addDecorator(
    moduleMetadata({
      imports: [StatelessUserToolbarModule],
    }),
  )
  .add('Default', () => ({
    template: `<stateless-user-toolbar></stateless-user-toolbar>`,
  }))
  .add('with hamburger', () => ({
    template: `<stateless-user-toolbar showHamburger="true"></stateless-user-toolbar>`,
  }))
  .add('with loading bar', () => ({
    template: `<stateless-user-toolbar showLoadingBar="true"></stateless-user-toolbar>`,
  }))
  .add('with loading profile', () => ({
    template: `<stateless-user-toolbar loadingProfile="true"></stateless-user-toolbar>`,
  }))
  .add('with display name', () => ({
    template: `<stateless-user-toolbar displayName="Steph Curry"></stateless-user-toolbar>`,
  }))
  .add('with avatar', () => ({
    template: `<stateless-user-toolbar avatarUrl="https://avatars.dicebear.com/v2/avataaars/sdf.svg"></stateless-user-toolbar>`,
  }));
