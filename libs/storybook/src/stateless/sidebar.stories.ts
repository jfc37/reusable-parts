import { storiesOf, moduleMetadata } from '@storybook/angular';
import { SidebarModule, MenuItemType } from '@reusable-parts/stateless/sidebar';
import { APP_BASE_HREF } from '@angular/common';
import { FuseModule } from '@reusable-parts/fuse';
import { RouterModule } from '@angular/router';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { SidebarComponent } from '@reusable-parts/stateless/sidebar';

storiesOf('Stateless Sidebar', module)
  .addDecorator(
    moduleMetadata({
      imports: [
        RouterModule.forRoot([{ path: 'iframe.html', component: SidebarComponent }]),
        SidebarModule,
        FuseModule.forRoot({}),
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
    }),
  )
  .addDecorator(withKnobs)
  .add('All knobs', () => {
    const name = text('name', 'Full Swing');
    const folded = boolean('folded', false);
    const logoUrl = text('logoUrl', 'http://angular-material.fusetheme.com/assets/images/logos/fuse.svg');
    const menuItems = [
      {
        id: 'admin',
        title: 'Admin',
        icon: 'lock',
        type: MenuItemType.Collapse,
        children: [
          {
            id: 'teachers',
            title: 'Teachers',
            icon: 'people',
            type: MenuItemType.Item,
            url: 'admin/teachers',
          },
          {
            id: 'blocks',
            title: 'Blocks',
            icon: 'view_module',
            type: MenuItemType.Item,
            url: 'admin/blocks',
          },
        ],
      },
    ];
    return {
      template: `
      <stateless-sidebar
        [name]="name"
        [folded]="folded"
        [menuItems]="menuItems"
        [logoUrl]="logoUrl"
        (toggleFolded)="toggleFolded($event)">
      </stateless-sidebar>`,
      props: {
        name,
        folded,
        logoUrl,
        menuItems,
        toggleFolded: action('toggleFolded'),
      },
    };
  });
