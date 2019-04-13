import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarModule } from '@reusable-parts/stateless/components/sidebar';
import { StatelessUserToolbarModule } from '@reusable-parts/stateless/components/user-toolbar';
import { PageWithNavComponent } from './page-with-nav.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FuseDirectivesModule } from '@reusable-parts/fuse';

@NgModule({
  imports: [CommonModule, FlexLayoutModule, FuseDirectivesModule, SidebarModule, StatelessUserToolbarModule],
  declarations: [PageWithNavComponent],
  exports: [PageWithNavComponent],
})
export class PageWithNavModule {}
