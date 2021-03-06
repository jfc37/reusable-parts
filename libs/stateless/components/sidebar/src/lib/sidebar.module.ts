import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import {
  FuseSidebarModule,
  FuseNavigationModule,
  FuseSharedModule,
  FuseDirectivesModule,
  FuseModule,
} from '@reusable-parts/fuse';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavigationComponent } from './sidebar-content/navigation.component';
import { NavVerticalCollapsableComponent } from './sidebar-content/vertical/collapsable/collapsable.component';
import { NavVerticalGroupComponent } from './sidebar-content/vertical/group/group.component';
import { NavVerticalItemComponent } from './sidebar-content/vertical/item/item.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
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
