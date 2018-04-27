import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserStateModule } from '@reusable-parts/user-state';
import { GetAllUserRoles } from '@reusable-parts/user-state/src/user-roles/loading-user-roles/loading-user-roles.actions';

@Component({
  selector: 'jfc-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss'],
})
export class TeachersComponent implements OnInit {
  constructor(private store: Store<UserStateModule>) {}

  public ngOnInit(): void {
    this.store.dispatch(new GetAllUserRoles());
  }
}
