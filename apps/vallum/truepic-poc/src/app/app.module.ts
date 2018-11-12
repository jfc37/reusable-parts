import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';
import { CommonUiComponentsModule } from '@reusable-parts/common-ui-components/src';
import { HomeComponent } from './home/home.component';
import { MatButtonModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { FuseSharedModule, FuseModule } from '@reusable-parts/@fuse';
import { PictureDetailsComponent } from './picture-details/picture-details.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, HomeComponent, PictureDetailsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    CommonUiComponentsModule,
    NxModule.forRoot(),
    RouterModule.forRoot(
      [
        { path: 'home', component: HomeComponent },
        { path: 'picture-details', component: PictureDetailsComponent },
        { path: '', pathMatch: 'full', redirectTo: 'home' },
      ],
      { initialNavigation: 'enabled' },
    ),
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,

    FuseModule.forRoot({}),
    FuseSharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
