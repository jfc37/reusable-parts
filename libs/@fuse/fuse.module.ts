import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { FUSE_CONFIG, FuseConfigService } from '@reusable-parts/@fuse/services/config.service';
import { FuseCopierService } from '@reusable-parts/@fuse/services/copier.service';
import { FuseMatchMediaService } from '@reusable-parts/@fuse/services/match-media.service';
import { FuseMatSidenavHelperService } from '@reusable-parts/@fuse/directives/fuse-mat-sidenav/fuse-mat-sidenav.service';
import { FuseNavigationService } from '@reusable-parts/@fuse/components/navigation/navigation.service';
import { FuseSidebarService } from '@reusable-parts/@fuse/components/sidebar/sidebar.service';
import { FuseSplashScreenService } from '@reusable-parts/@fuse/services/splash-screen.service';
import { FuseTranslationLoaderService } from '@reusable-parts/@fuse/services/translation-loader.service';

@NgModule({
    entryComponents: [],
    providers      : [
        FuseConfigService,
        FuseCopierService,
        FuseMatchMediaService,
        FuseMatSidenavHelperService,
        FuseNavigationService,
        FuseSidebarService,
        FuseSplashScreenService,
        FuseTranslationLoaderService
    ]
})
export class FuseModule
{
    constructor(@Optional() @SkipSelf() parentModule: FuseModule)
    {
        if ( parentModule )
        {
            throw new Error('FuseModule is already loaded. Import it in the AppModule only!');
        }
    }

    static forRoot(config): ModuleWithProviders
    {
        return {
            ngModule : FuseModule,
            providers: [
                {
                    provide : FUSE_CONFIG,
                    useValue: config
                }
            ]
        };
    }
}
