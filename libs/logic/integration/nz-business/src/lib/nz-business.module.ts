import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CompaniesRepository } from './companies-entities-roles/companies.repository';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [CompaniesRepository],
})
export class NzBusinessModule {}
