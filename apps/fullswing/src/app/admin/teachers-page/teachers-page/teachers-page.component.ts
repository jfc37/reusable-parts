import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserStateModule } from '@reusable-parts/user-state';
import { GetAllUserRoles } from '@reusable-parts/user-state/src/user-roles/loading-user-roles/loading-user-roles.actions';
import { GetAllUsers } from '@reusable-parts/user-state/src/users/loading-users/loading-users.actions';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import {
  errorsSelector,
  loadingSelector,
  teachersSelector,
} from './teachers-page.component.selectors';

@Component({
  selector: 'jfc-teachers',
  templateUrl: './teachers-page.component.html',
  styleUrls: ['./teachers-page.component.scss'],
})
export class TeachersPageComponent implements OnInit {
  public loading$: Observable<boolean>;
  public errorMessages$: Observable<string[]>;
  public hasError$: Observable<boolean>;

  public teachers$: Observable<any>;

  constructor(private store: Store<UserStateModule>) {}

  public ngOnInit(): void {
    this.store.dispatch(new GetAllUserRoles());
    this.store.dispatch(new GetAllUsers());

    this.loading$ = this.store.select(loadingSelector);
    this.errorMessages$ = this.store.select(errorsSelector);
    this.hasError$ = this.errorMessages$.pipe(
      map(errorMessages => errorMessages.length > 0)
    );

    this.teachers$ = this.store.select(teachersSelector);
  }
}
