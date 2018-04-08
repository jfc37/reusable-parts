import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { FuseDirectivesModule } from '@reusable-parts/@fuse/directives/directives';
import { FusePipesModule } from '@reusable-parts/@fuse/pipes/pipes.module';
import { RouterModule } from '@angular/router';

@NgModule({
    imports  : [
        // CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,

        FlexLayoutModule,

        FuseDirectivesModule,
        FusePipesModule
    ],
    exports  : [
        // CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,

        FlexLayoutModule,

        FuseDirectivesModule,
        FusePipesModule,
    ]
})
export class FuseSharedModule
{
}
