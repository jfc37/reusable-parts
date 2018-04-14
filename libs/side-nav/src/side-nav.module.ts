import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatSidenavModule } from '@angular/material';
import { FuseSidebarModule } from '@reusable-parts/@fuse/components';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { SideNavContentComponent } from './components/side-nav-content/side-nav-content.component';

@NgModule({
  imports: [
    CommonModule,

    MatButtonModule,
    MatIconModule,
    MatSidenavModule,

    FuseSidebarModule,
  ],
  declarations: [SideNavComponent, SideNavContentComponent],
  exports: [SideNavComponent],
})
export class SideNavModule {}
