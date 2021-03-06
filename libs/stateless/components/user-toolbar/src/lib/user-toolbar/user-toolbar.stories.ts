import { storiesOf, moduleMetadata } from '@storybook/angular';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { StatelessUserToolbarModule } from '@reusable-parts/stateless/components/user-toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

storiesOf('Components/User Toolbar', module)
  .addDecorator(
    moduleMetadata({
      imports: [BrowserAnimationsModule, StatelessUserToolbarModule],
    }),
  )
  .addDecorator(withKnobs)
  .add('All knobs', () => {
    const showHamburger = boolean('showHamburger', true);
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
        [avatarUrl]="avatarUrl"
        (hamburgerClicked)="hamburgerClicked($event)"
        (logoutClicked)="logoutClicked($event)">
      </stateless-user-toolbar>`,
      props: {
        showHamburger,
        showLoadingBar,
        loadingProfile,
        displayName,
        avatarUrl,
        hamburgerClicked: action('hamburgerClicked'),
        logoutClicked: action('logoutClicked'),
      },
    };
  });
