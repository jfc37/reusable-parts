import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public companySelected(company): void {
    console.error('selected...', company);
  }
}
