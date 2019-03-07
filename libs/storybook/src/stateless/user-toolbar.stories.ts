import { storiesOf, moduleMetadata } from '@storybook/angular';
import { StatelessUserToolbarComponent } from '@reusable-parts/stateless/user-toolbar';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
} from '@angular/material';
import { FuseSharedModule } from '@reusable-parts/fuse/src/lib/@fuse';

storiesOf('Stateless User Toolbar', module)
  .addDecorator(
    moduleMetadata({
      // TODO: JOE StoryBook
      // imports: [StatelessUserToolbarModule],
      imports: [
        CommonModule,

        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatToolbarModule,

        FuseSharedModule,
      ],
      declarations: [StatelessUserToolbarComponent],
    }),
  )
  .add('Default', () => ({
    component: StatelessUserToolbarComponent,
  }))
  .add('with hamburger', () => ({
    component: StatelessUserToolbarComponent,
    props: {
      showHamburger: true,
    },
  }))
  .add('with loading bar', () => ({
    component: StatelessUserToolbarComponent,
    props: {
      showLoadingBar: true,
    },
  }))
  .add('with loading profile', () => ({
    component: StatelessUserToolbarComponent,
    props: {
      loadingProfile: true,
    },
  }))
  .add('with display name', () => ({
    component: StatelessUserToolbarComponent,
    props: {
      displayName: 'Lance Armstrong',
    },
  }))
  .add('with avatar', () => ({
    component: StatelessUserToolbarComponent,
    props: {
      avatarUrl: 'https://avatars.dicebear.com/v2/avataaars/sdf.svg',
    },
  }));
