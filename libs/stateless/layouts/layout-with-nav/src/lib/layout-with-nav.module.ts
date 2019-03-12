import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarModule } from '@reusable-parts/stateless/sidebar';
import { StatelessUserToolbarModule } from '@reusable-parts/stateless/user-toolbar';
import { LayoutWithNavComponent } from './layout-with-nav/layout-with-nav.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [CommonModule, FlexLayoutModule, SidebarModule, StatelessUserToolbarModule],
  declarations: [LayoutWithNavComponent],
  exports: [LayoutWithNavComponent],
})
export class LayoutWithNavModule {}
