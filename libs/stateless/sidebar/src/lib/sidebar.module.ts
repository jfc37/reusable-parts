import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatSidenavModule, MatRippleModule } from '@angular/material';
import { FuseSidebarModule, FuseNavigationModule, FuseSharedModule, FuseDirectivesModule } from '@reusable-parts/fuse';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavigationComponent } from './sidebar-content/navigation.component';
import { NavVerticalCollapsableComponent } from './sidebar-content/vertical/collapsable/collapsable.component';
import { NavVerticalGroupComponent } from './sidebar-content/vertical/group/group.component';
import { NavVerticalItemComponent } from './sidebar-content/vertical/item/item.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,

    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatRippleModule,

    FuseSharedModule,
    FuseSidebarModule,
    FuseNavigationModule,
    FuseDirectivesModule,
  ],
  declarations: [
    SidebarComponent,
    NavigationComponent,
    NavVerticalCollapsableComponent,
    NavVerticalGroupComponent,
    NavVerticalItemComponent,
  ],
  exports: [SidebarComponent],
})
export class SidebarModule {}
