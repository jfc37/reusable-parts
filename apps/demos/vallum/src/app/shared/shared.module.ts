import { NgModule } from '@angular/core';
import { ShellComponent } from './components/shell/shell.component';
import { CommonModule } from '@angular/common';
import { PageWithNavModule } from '@reusable-parts/stateless/layouts/page-with-nav';

@NgModule({
  declarations: [ShellComponent],
  imports: [CommonModule, PageWithNavModule],
  exports: [CommonModule, ShellComponent],
})
export class SharedModule {}
