import { NgModule } from '@angular/core';

import { FuseHighlightComponent } from '@reusable-parts/@fuse/components/highlight/highlight.component';

@NgModule({
    declarations: [
        FuseHighlightComponent
    ],
    exports: [
        FuseHighlightComponent
    ],
})
export class FuseHighlightModule
{
}
