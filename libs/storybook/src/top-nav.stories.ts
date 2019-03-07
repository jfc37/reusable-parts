import { storiesOf, moduleMetadata } from '@storybook/angular';
import { DumbTopNavComponent } from '@reusable-parts/top-nav';
import {
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
} from '@angular/material';
import { FuseSharedModule } from '@reusable-parts/fuse';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

storiesOf('Top Nav', module)
  .addDecorator(
    moduleMetadata({
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatToolbarModule,
        FuseSharedModule,
      ],
      declarations: [DumbTopNavComponent],
    }),
  )
  .add('Default', () => ({
    component: DumbTopNavComponent,
  }))
  .add('with hamburger', () => ({
    component: DumbTopNavComponent,
    props: {
      showHamburger: true,
    },
  }))
  .add('with loading bar', () => ({
    component: DumbTopNavComponent,
    props: {
      showLoadingBar: true,
    },
  }))
  .add('with loading profile', () => ({
    component: DumbTopNavComponent,
    props: {
      loadingProfile: true,
    },
  }))
  .add('with display name', () => ({
    component: DumbTopNavComponent,
    props: {
      displayName: 'Lance Armstrong',
    },
  }))
  .add('with avatar', () => ({
    component: DumbTopNavComponent,
    props: {
      avatarUrl: 'https://avatars.dicebear.com/v2/avataaars/sdf.svg',
    },
  }));
