import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from '@reusable-parts/stateless/layouts/header';
import { PageComponent } from './page.component';

@NgModule({
  imports: [CommonModule, HeaderModule],
  declarations: [PageComponent],
  exports: [PageComponent],
})
export class PageModule {}
