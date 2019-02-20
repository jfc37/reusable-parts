import { NgModule } from '@angular/core';

import { FuseHighlightComponent } from '@reusable-parts/fuse/src/lib/@fuse/components/highlight/highlight.component';

@NgModule({
  declarations: [FuseHighlightComponent],
  exports: [FuseHighlightComponent],
})
export class FuseHighlightModule {}
