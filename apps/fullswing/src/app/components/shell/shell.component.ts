import { Component, OnInit } from '@angular/core';
import { MenuItem } from '@reusable-parts/side-nav';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'jfc-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  public appName = `Full Swing`;
  public logoUrl = 'assets/fullswing.png';
  public menuItems$: Observable<MenuItem[]>;

  public ngOnInit(): void {
    this.menuItems$ = of([]);
  }
}
