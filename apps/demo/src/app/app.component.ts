import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FuseTranslationLoaderService } from '@reusable-parts/@fuse/services/translation-loader.service';
import { locale as navigationEnglish } from './navigation/i18n/en';

@Component({
  selector: 'jfc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public appName = `Barber's Shop`;
  public logoUrl = 'assets/images/logos/fuse.svg';
  public menuItems = [
    {
      'id': 'applications',
      'title': 'Applications',
      'translateKey': 'NAV.APPLICATIONS',
      'type': 'group',
      'icon': 'apps',
      'children': [
        {
          'id': 'dashboards',
          'title': 'Dashboards',
          'translateKey': 'NAV.DASHBOARDS',
          'type': 'collapse',
          'icon': 'dashboard',
          'children': [
            {
              'id': 'analytics',
              'title': 'Analytics',
              'type': 'item',
              'url': '/apps/dashboards/analytics'
            },
            {
              'id': 'project',
              'title': 'Project',
              'type': 'item',
              'url': '/apps/dashboards/project'
            }
          ]
        },
        {
          'id': 'calendar',
          'title': 'Calendar',
          'translateKey': 'NAV.CALENDAR',
          'type': 'item',
          'icon': 'today',
          'url': '/apps/calendar'
        },
        {
          'id': 'e-commerce',
          'title': 'E-Commerce',
          'translateKey': 'NAV.ECOMMERCE',
          'type': 'collapse',
          'icon': 'shopping_cart',
          'children': [
            {
              'id': 'dashboard',
              'title': 'Dashboard',
              'type': 'item',
              'url': '/apps/e-commerce/dashboard'
            },
            {
              'id': 'products',
              'title': 'Products',
              'type': 'item',
              'url': '/apps/e-commerce/products',
              'exactMatch': true
            },
            {
              'id': 'productDetail',
              'title': 'Product Detail',
              'type': 'item',
              'url': '/apps/e-commerce/products/1/printed-dress',
              'exactMatch': true
            },
            {
              'id': 'orders',
              'title': 'Orders',
              'type': 'item',
              'url': '/apps/e-commerce/orders',
              'exactMatch': true
            },
            {
              'id': 'orderDetail',
              'title': 'Order Detail',
              'type': 'item',
              'url': '/apps/e-commerce/orders/1',
              'exactMatch': true
            }
          ]
        },
        {
          'id': 'academy',
          'title': 'Academy',
          'translateKey': 'NAV.ACADEMY',
          'type': 'item',
          'icon': 'school',
          'url': '/apps/academy'
        },
        {
          'id': 'mail',
          'title': 'Mail',
          'translateKey': 'NAV.MAIL.TITLE',
          'type': 'item',
          'icon': 'email',
          'url': '/apps/mail',
          'badge': {
            'title': 25,
            'translateKey': 'NAV.MAIL.BADGE',
            'backgroundColour': '#F44336',
            'textColour': '#FFFFFF'
          }
        },
        {
          'id': 'mail-ngrx',
          'title': 'Mail Ngrx',
          'translateKey': 'NAV.MAIL_NGRX.TITLE',
          'type': 'item',
          'icon': 'email',
          'url': '/apps/mail-ngrx',
          'badge': {
            'title': 13,
            'translateKey': 'NAV.MAIL_NGRX.BADGE',
            'backgroundColour': '#EC0C8E',
            'textColour': '#FFFFFF'
          }
        },
        {
          'id': 'chat',
          'title': 'Chat',
          'translateKey': 'NAV.CHAT',
          'type': 'item',
          'icon': 'chat',
          'url': '/apps/chat',
          'badge': {
            'title': 13,
            'backgroundColour': '#09d261',
            'textColour': '#FFFFFF'
          }
        },
        {
          'id': 'file-manager',
          'title': 'File Manager',
          'translateKey': 'NAV.FILE_MANAGER',
          'type': 'item',
          'icon': 'folder',
          'url': '/apps/file-manager'
        },
        {
          'id': 'contacts',
          'title': 'Contacts',
          'translateKey': 'NAV.CONTACTS',
          'type': 'item',
          'icon': 'account_box',
          'url': '/apps/contacts'
        },
        {
          'id': 'to-do',
          'title': 'To-Do',
          'translateKey': 'NAV.TODO',
          'type': 'item',
          'icon': 'check_box',
          'url': '/apps/todo',
          'badge': {
            'title': 3,
            'backgroundColour': '#FF6F00',
            'textColour': '#FFFFFF'
          }
        },
        {
          'id': 'scrumboard',
          'title': 'Scrumboard',
          'translateKey': 'NAV.SCRUMBOARD',
          'type': 'item',
          'icon': 'assessment',
          'url': '/apps/scrumboard'
        }
      ]
    },
    {
      'id': 'pages',
      'title': 'Pages',
      'type': 'group',
      'icon': 'pages',
      'children': [
        {
          'id': 'authentication',
          'title': 'Authentication',
          'type': 'collapse',
          'icon': 'lock',
          'badge': {
            'title': 10,
            'backgroundColour': '#525e8a',
            'textColour': '#FFFFFF'
          },
          'children': [
            {
              'id': 'login',
              'title': 'Login',
              'type': 'item',
              'url': '/pages/auth/login'
            },
            {
              'id': 'login-v2',
              'title': 'Login v2',
              'type': 'item',
              'url': '/pages/auth/login-2'
            },
            {
              'id': 'register',
              'title': 'Register',
              'type': 'item',
              'url': '/pages/auth/register'
            },
            {
              'id': 'register-v2',
              'title': 'Register v2',
              'type': 'item',
              'url': '/pages/auth/register-2'
            },
            {
              'id': 'forgot-password',
              'title': 'Forgot Password',
              'type': 'item',
              'url': '/pages/auth/forgot-password'
            },
            {
              'id': 'forgot-password-v2',
              'title': 'Forgot Password v2',
              'type': 'item',
              'url': '/pages/auth/forgot-password-2'
            },
            {
              'id': 'reset-password',
              'title': 'Reset Password',
              'type': 'item',
              'url': '/pages/auth/reset-password'
            },
            {
              'id': 'reset-password-v2',
              'title': 'Reset Password v2',
              'type': 'item',
              'url': '/pages/auth/reset-password-2'
            },
            {
              'id': 'lock-screen',
              'title': 'Lock Screen',
              'type': 'item',
              'url': '/pages/auth/lock'
            },
            {
              'id': 'mail-confirmation',
              'title': 'Mail Confirmation',
              'type': 'item',
              'url': '/pages/auth/mail-confirm'
            }
          ]
        },
        {
          'id': 'coming-soon',
          'title': 'Coming Soon',
          'type': 'item',
          'icon': 'alarm',
          'url': '/pages/coming-soon'
        },
        {
          'id': 'errors',
          'title': 'Errors',
          'type': 'collapse',
          'icon': 'error',
          'children': [
            {
              'id': '404',
              'title': '404',
              'type': 'item',
              'url': '/pages/errors/error-404'
            },
            {
              'id': '500',
              'title': '500',
              'type': 'item',
              'url': '/pages/errors/error-500'
            }
          ]
        },
        {
          'id': 'invoice',
          'title': 'Invoice',
          'type': 'collapse',
          'icon': 'receipt',
          'children': [
            {
              'id': 'modern',
              'title': 'Modern',
              'type': 'item',
              'url': '/pages/invoices/modern'
            },
            {
              'id': 'compact',
              'title': 'Compact',
              'type': 'item',
              'url': '/pages/invoices/compact'
            }
          ]
        },
        {
          'id': 'maintenance',
          'title': 'Maintenance',
          'type': 'item',
          'icon': 'build',
          'url': '/pages/maintenance'
        },
        {
          'id': 'pricing',
          'title': 'Pricing',
          'type': 'collapse',
          'icon': 'attach_money',
          'children': [
            {
              'id': 'style-1',
              'title': 'Style 1',
              'type': 'item',
              'url': '/pages/pricing/style-1'
            },
            {
              'id': 'style-2',
              'title': 'Style 2',
              'type': 'item',
              'url': '/pages/pricing/style-2'
            },
            {
              'id': 'style-3',
              'title': 'Style 3',
              'type': 'item',
              'url': '/pages/pricing/style-3'
            }
          ]
        },
        {
          'id': 'profile',
          'title': 'Profile',
          'type': 'item',
          'icon': 'person',
          'url': '/pages/profile'
        },
        {
          'id': 'search',
          'title': 'Search',
          'type': 'item',
          'icon': 'search',
          'url': '/pages/search'
        },
        {
          'title': 'Faq',
          'type': 'item',
          'icon': 'help',
          'url': '/pages/faq'
        },
        {
          'title': 'Knowledge Base',
          'type': 'item',
          'icon': 'import_contacts',
          'url': '/pages/knowledge-base'
        }
      ]
    },
  ];
  constructor(
    private translate: TranslateService,
    private fuseTranslationLoader: FuseTranslationLoaderService
  ) {
    // Add languages
    this.translate.addLangs(['en']);

    // Set the default language
    this.translate.setDefaultLang('en');

    // Set the navigation translations
    this.fuseTranslationLoader.loadTranslations(navigationEnglish);

    // Use a language
    this.translate.use('en');
  }
}
