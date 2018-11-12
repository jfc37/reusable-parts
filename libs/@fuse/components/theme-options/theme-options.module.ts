import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MatButtonModule, MatCheckboxModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatOptionModule, MatRadioModule, MatSelectModule, MatSlideToggleModule
} from '@angular/material';

import { FuseDirectivesModule } from '@reusable-parts/@fuse/directives/directives';
import { FuseMaterialColorPickerModule } from '@reusable-parts/@fuse/components/material-color-picker/material-color-picker.module';
import { FuseSidebarModule } from '@reusable-parts/@fuse/components/sidebar/sidebar.module';

import { FuseThemeOptionsComponent } from '@reusable-parts/@fuse/components/theme-options/theme-options.component';

@NgModule({
    declarations: [
        FuseThemeOptionsComponent
    ],
    imports     : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        FlexLayoutModule,

        MatButtonModule,
        MatCheckboxModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatOptionModule,
        MatRadioModule,
        MatSelectModule,
        MatSlideToggleModule,

        FuseDirectivesModule,
        FuseMaterialColorPickerModule,
        FuseSidebarModule
    ],
    exports     : [
        FuseThemeOptionsComponent
    ]
})
export class FuseThemeOptionsModule
{
}
