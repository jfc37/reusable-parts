import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { FuseNavigationService } from '@reusable-parts/@fuse/components/navigation/navigation.service';
import { FuseSidebarService } from '@reusable-parts/@fuse/components/sidebar/sidebar.service';
import { FusePerfectScrollbarDirective } from '@reusable-parts/@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'jfc-side-nav-content',
  templateUrl: './side-nav-content.component.html',
  styleUrls: ['./side-nav-content.component.scss'],
})
export class SideNavContentComponent implements OnInit, OnDestroy {
  public navigation = [
    {
        'id'       : 'applications',
        'title'    : 'Applications',
        'translate': 'NAV.APPLICATIONS',
        'type'     : 'group',
        'icon'     : 'apps',
        'children' : [
            {
                'id'       : 'dashboards',
                'title'    : 'Dashboards',
                'translate': 'NAV.DASHBOARDS',
                'type'     : 'collapse',
                'icon'     : 'dashboard',
                'children' : [
                    {
                        'id'   : 'analytics',
                        'title': 'Analytics',
                        'type' : 'item',
                        'url'  : '/apps/dashboards/analytics'
                    },
                    {
                        'id'   : 'project',
                        'title': 'Project',
                        'type' : 'item',
                        'url'  : '/apps/dashboards/project'
                    }
                ]
            },
            {
                'id'       : 'calendar',
                'title'    : 'Calendar',
                'translate': 'NAV.CALENDAR',
                'type'     : 'item',
                'icon'     : 'today',
                'url'      : '/apps/calendar'
            },
            {
                'id'       : 'e-commerce',
                'title'    : 'E-Commerce',
                'translate': 'NAV.ECOMMERCE',
                'type'     : 'collapse',
                'icon'     : 'shopping_cart',
                'children' : [
                    {
                        'id'   : 'dashboard',
                        'title': 'Dashboard',
                        'type' : 'item',
                        'url'  : '/apps/e-commerce/dashboard'
                    },
                    {
                        'id'        : 'products',
                        'title'     : 'Products',
                        'type'      : 'item',
                        'url'       : '/apps/e-commerce/products',
                        'exactMatch': true
                    },
                    {
                        'id'        : 'productDetail',
                        'title'     : 'Product Detail',
                        'type'      : 'item',
                        'url'       : '/apps/e-commerce/products/1/printed-dress',
                        'exactMatch': true
                    },
                    {
                        'id'        : 'orders',
                        'title'     : 'Orders',
                        'type'      : 'item',
                        'url'       : '/apps/e-commerce/orders',
                        'exactMatch': true
                    },
                    {
                        'id'        : 'orderDetail',
                        'title'     : 'Order Detail',
                        'type'      : 'item',
                        'url'       : '/apps/e-commerce/orders/1',
                        'exactMatch': true
                    }
                ]
            },
            {
                'id'       : 'academy',
                'title'    : 'Academy',
                'translate': 'NAV.ACADEMY',
                'type'     : 'item',
                'icon'     : 'school',
                'url'      : '/apps/academy'
            },
            {
                'id'       : 'mail',
                'title'    : 'Mail',
                'translate': 'NAV.MAIL.TITLE',
                'type'     : 'item',
                'icon'     : 'email',
                'url'      : '/apps/mail',
                'badge'    : {
                    'title'    : 25,
                    'translate': 'NAV.MAIL.BADGE',
                    'bg'       : '#F44336',
                    'fg'       : '#FFFFFF'
                }
            },
            {
                'id'       : 'mail-ngrx',
                'title'    : 'Mail Ngrx',
                'translate': 'NAV.MAIL_NGRX.TITLE',
                'type'     : 'item',
                'icon'     : 'email',
                'url'      : '/apps/mail-ngrx',
                'badge'    : {
                    'title'    : 13,
                    'translate': 'NAV.MAIL_NGRX.BADGE',
                    'bg'       : '#EC0C8E',
                    'fg'       : '#FFFFFF'
                }
            },
            {
                'id'       : 'chat',
                'title'    : 'Chat',
                'translate': 'NAV.CHAT',
                'type'     : 'item',
                'icon'     : 'chat',
                'url'      : '/apps/chat',
                'badge'    : {
                    'title': 13,
                    'bg'   : '#09d261',
                    'fg'   : '#FFFFFF'
                }
            },
            {
                'id'       : 'file-manager',
                'title'    : 'File Manager',
                'translate': 'NAV.FILE_MANAGER',
                'type'     : 'item',
                'icon'     : 'folder',
                'url'      : '/apps/file-manager'
            },
            {
                'id'       : 'contacts',
                'title'    : 'Contacts',
                'translate': 'NAV.CONTACTS',
                'type'     : 'item',
                'icon'     : 'account_box',
                'url'      : '/apps/contacts'
            },
            {
                'id'       : 'to-do',
                'title'    : 'To-Do',
                'translate': 'NAV.TODO',
                'type'     : 'item',
                'icon'     : 'check_box',
                'url'      : '/apps/todo',
                'badge'    : {
                    'title': 3,
                    'bg'   : '#FF6F00',
                    'fg'   : '#FFFFFF'
                }
            },
            {
                'id'       : 'scrumboard',
                'title'    : 'Scrumboard',
                'translate': 'NAV.SCRUMBOARD',
                'type'     : 'item',
                'icon'     : 'assessment',
                'url'      : '/apps/scrumboard'
            }
        ]
    },
    {
        'id'      : 'pages',
        'title'   : 'Pages',
        'type'    : 'group',
        'icon'    : 'pages',
        'children': [
            {
                'id'      : 'authentication',
                'title'   : 'Authentication',
                'type'    : 'collapse',
                'icon'    : 'lock',
                'badge'   : {
                    'title': 10,
                    'bg'   : '#525e8a',
                    'fg'   : '#FFFFFF'
                },
                'children': [
                    {
                        'id'   : 'login',
                        'title': 'Login',
                        'type' : 'item',
                        'url'  : '/pages/auth/login'
                    },
                    {
                        'id'   : 'login-v2',
                        'title': 'Login v2',
                        'type' : 'item',
                        'url'  : '/pages/auth/login-2'
                    },
                    {
                        'id'   : 'register',
                        'title': 'Register',
                        'type' : 'item',
                        'url'  : '/pages/auth/register'
                    },
                    {
                        'id'   : 'register-v2',
                        'title': 'Register v2',
                        'type' : 'item',
                        'url'  : '/pages/auth/register-2'
                    },
                    {
                        'id'   : 'forgot-password',
                        'title': 'Forgot Password',
                        'type' : 'item',
                        'url'  : '/pages/auth/forgot-password'
                    },
                    {
                        'id'   : 'forgot-password-v2',
                        'title': 'Forgot Password v2',
                        'type' : 'item',
                        'url'  : '/pages/auth/forgot-password-2'
                    },
                    {
                        'id'   : 'reset-password',
                        'title': 'Reset Password',
                        'type' : 'item',
                        'url'  : '/pages/auth/reset-password'
                    },
                    {
                        'id'   : 'reset-password-v2',
                        'title': 'Reset Password v2',
                        'type' : 'item',
                        'url'  : '/pages/auth/reset-password-2'
                    },
                    {
                        'id'   : 'lock-screen',
                        'title': 'Lock Screen',
                        'type' : 'item',
                        'url'  : '/pages/auth/lock'
                    },
                    {
                        'id'   : 'mail-confirmation',
                        'title': 'Mail Confirmation',
                        'type' : 'item',
                        'url'  : '/pages/auth/mail-confirm'
                    }
                ]
            },
            {
                'id'   : 'coming-soon',
                'title': 'Coming Soon',
                'type' : 'item',
                'icon' : 'alarm',
                'url'  : '/pages/coming-soon'
            },
            {
                'id'      : 'errors',
                'title'   : 'Errors',
                'type'    : 'collapse',
                'icon'    : 'error',
                'children': [
                    {
                        'id'   : '404',
                        'title': '404',
                        'type' : 'item',
                        'url'  : '/pages/errors/error-404'
                    },
                    {
                        'id'   : '500',
                        'title': '500',
                        'type' : 'item',
                        'url'  : '/pages/errors/error-500'
                    }
                ]
            },
            {
                'id'      : 'invoice',
                'title'   : 'Invoice',
                'type'    : 'collapse',
                'icon'    : 'receipt',
                'children': [
                    {
                        'id'   : 'modern',
                        'title': 'Modern',
                        'type' : 'item',
                        'url'  : '/pages/invoices/modern'
                    },
                    {
                        'id'   : 'compact',
                        'title': 'Compact',
                        'type' : 'item',
                        'url'  : '/pages/invoices/compact'
                    }
                ]
            },
            {
                'id'   : 'maintenance',
                'title': 'Maintenance',
                'type' : 'item',
                'icon' : 'build',
                'url'  : '/pages/maintenance'
            },
            {
                'id'      : 'pricing',
                'title'   : 'Pricing',
                'type'    : 'collapse',
                'icon'    : 'attach_money',
                'children': [
                    {
                        'id'   : 'style-1',
                        'title': 'Style 1',
                        'type' : 'item',
                        'url'  : '/pages/pricing/style-1'
                    },
                    {
                        'id'   : 'style-2',
                        'title': 'Style 2',
                        'type' : 'item',
                        'url'  : '/pages/pricing/style-2'
                    },
                    {
                        'id'   : 'style-3',
                        'title': 'Style 3',
                        'type' : 'item',
                        'url'  : '/pages/pricing/style-3'
                    }
                ]
            },
            {
                'id'   : 'profile',
                'title': 'Profile',
                'type' : 'item',
                'icon' : 'person',
                'url'  : '/pages/profile'
            },
            {
                'id'   : 'search',
                'title': 'Search',
                'type' : 'item',
                'icon' : 'search',
                'url'  : '/pages/search'
            },
            {
                'title': 'Faq',
                'type' : 'item',
                'icon' : 'help',
                'url'  : '/pages/faq'
            },
            {
                'title': 'Knowledge Base',
                'type' : 'item',
                'icon' : 'import_contacts',
                'url'  : '/pages/knowledge-base'
            }
        ]
    },
];
  private fusePerfectScrollbar: FusePerfectScrollbarDirective;

  @ViewChild(FusePerfectScrollbarDirective) set directive(theDirective: FusePerfectScrollbarDirective) {
    if (!theDirective) {
      return;
    }

    this.fusePerfectScrollbar = theDirective;

    this.navigationServiceWatcher =
      this.navigationService.onItemCollapseToggled.subscribe(() => {
        this.fusePerfectScrollbarUpdateTimeout = setTimeout(() => {
          this.fusePerfectScrollbar.update();
        }, 310);
      });
  }

  @Input() layout;
  navigationServiceWatcher: Subscription;
  fusePerfectScrollbarUpdateTimeout;

  constructor(
    private sidebarService: FuseSidebarService,
    private navigationService: FuseNavigationService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.router.events.subscribe(
      (event) => {
        if (event instanceof NavigationEnd) {
          if (this.sidebarService.getSidebar('navbar')) {
            this.sidebarService.getSidebar('navbar').close();
          }
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.fusePerfectScrollbarUpdateTimeout) {
      clearTimeout(this.fusePerfectScrollbarUpdateTimeout);
    }

    if (this.navigationServiceWatcher) {
      this.navigationServiceWatcher.unsubscribe();
    }
  }

  toggleSidebarOpened() {
    this.sidebarService.getSidebar('navbar').toggleOpen();
  }

  toggleSidebarFolded() {
    this.sidebarService.getSidebar('navbar').toggleFold();
  }
}
