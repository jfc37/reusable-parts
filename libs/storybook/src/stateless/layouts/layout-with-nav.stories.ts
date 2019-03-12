import { storiesOf, moduleMetadata } from '@storybook/angular';
import { LayoutWithNavModule, LayoutWithNavComponent } from '@reusable-parts/stateless/layouts/layout-with-nav';
import { withKnobs } from '@storybook/addon-knobs';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

storiesOf('Layout with navigation', module)
  .addDecorator(
    moduleMetadata({
      imports: [
        RouterModule.forRoot([{ path: 'iframe.html', component: LayoutWithNavComponent }]),
        LayoutWithNavModule,
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
    }),
  )
  .addDecorator(withKnobs)
  .add('All knobs', () => {
    return {
      template: `
      <layout-with-nav [contentTemplate]="mainContentTemplate"></layout-with-nav>
      <ng-template #mainContentTemplate>
        <h1>Title</h1>
      </ng-template>
      `,
      props: {},
    };
  });
