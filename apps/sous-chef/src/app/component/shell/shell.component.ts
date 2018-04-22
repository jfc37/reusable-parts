import { Component, OnInit } from '@angular/core';
import { MenuItem, MenuItemType } from '@reusable-parts/side-nav';
import { Store } from '@ngrx/store';
import { AppState } from '../../+state/app.state';
import { sideNavigationSelector } from '../../+state/app.selectors';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'jfc-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  public appName = `Sous Chef`;
  public logoUrl = 'assets/chef.png';
  public menuItems$: Observable<MenuItem[]>;

  constructor(private store: Store<AppState>) {}

  public ngOnInit(): void {
    this.menuItems$ = this.store.select(sideNavigationSelector);
  }
}
