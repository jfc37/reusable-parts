import { storiesOf, moduleMetadata } from '@storybook/angular';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { StatelessUserToolbarModule } from '@reusable-parts/stateless/user-toolbar';

storiesOf('Stateless User Toolbar', module)
  .addDecorator(
    moduleMetadata({
      imports: [StatelessUserToolbarModule],
    }),
  )
  .addDecorator(withKnobs)
  .add('All knobs', () => {
    const showHamburger = boolean('showHamburger', false);
    const showLoadingBar = boolean('showLoadingBar', false);
    const loadingProfile = boolean('loadingProfile', false);
    const displayName = text('displayName', 'Kevin Durant');
    const avatarUrl = text('avatarUrl', 'https://avatars.dicebear.com/v2/avataaars/joe.svg');
    return {
      template: `
      <stateless-user-toolbar
        [showHamburger]="showHamburger"
        [showLoadingBar]="showLoadingBar"
        [loadingProfile]="loadingProfile"
        [displayName]="displayName"
        [avatarUrl]="avatarUrl">
      </stateless-user-toolbar>`,
      props: {
        showHamburger,
        showLoadingBar,
        loadingProfile,
        displayName,
        avatarUrl,
      },
    };
  });
