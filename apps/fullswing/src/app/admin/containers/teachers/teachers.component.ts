import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserStateModule } from '@reusable-parts/user-state';
import { GetAllUserRoles } from '@reusable-parts/user-state/src/user-roles/loading-user-roles/loading-user-roles.actions';
import { Observable } from 'rxjs/Observable';
import {
  isLoadingAllUserRolesSelector,
  loadingAllUserRolesErrorMessageSelector,
} from '@reusable-parts/user-state/src/user-roles/loading-user-roles/loading-user-roles.selectors';
import { GetAllUsers } from '@reusable-parts/user-state/src/users/loading-users/loading-users.actions';
import {
  loadingSelector,
  errorsSelector,
} from './teachers.component.selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'jfc-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss'],
})
export class TeachersComponent implements OnInit {
  public loading$: Observable<boolean>;
  public errorMessages$: Observable<string[]>;
  public hasError$: Observable<boolean>;

  constructor(private store: Store<UserStateModule>) {}

  public ngOnInit(): void {
    this.store.dispatch(new GetAllUserRoles());
    this.store.dispatch(new GetAllUsers());

    this.loading$ = this.store.select(loadingSelector);
    this.errorMessages$ = this.store.select(errorsSelector);
    this.hasError$ = this.errorMessages$.pipe(
      map(errorMessages => errorMessages.length > 0)
    );
  }
}
