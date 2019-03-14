import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageModule } from '@reusable-parts/stateless/layouts/page';
import { SidebarModule } from '@reusable-parts/stateless/sidebar';
import { StatelessUserToolbarModule } from '@reusable-parts/stateless/user-toolbar';
import { PageWithNavComponent } from './page-with-nav.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [CommonModule, FlexLayoutModule, PageModule, SidebarModule, StatelessUserToolbarModule],
  declarations: [PageWithNavComponent],
  exports: [PageWithNavComponent],
})
export class PageWithNavModule {}
