import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatSidenavModule } from '@angular/material';
import { FuseSidebarModule, FuseNavigationModule } from '@reusable-parts/@fuse/components';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { SideNavContentComponent } from './components/side-nav-content/side-nav-content.component';
import { FuseSharedModule } from '@reusable-parts/@fuse';

@NgModule({
  imports: [
    CommonModule,

    MatButtonModule,
    MatIconModule,
    MatSidenavModule,

    FuseSharedModule,
    FuseSidebarModule,
    FuseNavigationModule,
  ],
  declarations: [SideNavComponent, SideNavContentComponent],
  exports: [SideNavComponent],
})
export class SideNavModule {}
