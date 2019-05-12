import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from '@reusable-parts/stateless/layouts/header';
import { HeroTextModule } from '@reusable-parts/stateless/components/hero-text';
import { PageComponent } from './page.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [CommonModule, FlexLayoutModule, HeaderModule, HeroTextModule],
  declarations: [PageComponent],
  exports: [PageComponent],
})
export class PageModule {}
