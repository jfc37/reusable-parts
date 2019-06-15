import { MenuItem } from '@reusable-parts/stateless/components/sidebar';

export class SidebarModel {
  name: string;
  logoUrl: string;
  menuItems: MenuItem[];
}

export class UserToolbarModel {
  showLoadingBar: boolean;
  loadingProfile: boolean;
  displayName: string;
  avatarUrl: string;
}
