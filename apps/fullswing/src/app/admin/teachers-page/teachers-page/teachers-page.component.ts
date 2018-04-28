import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { UserStateModule } from '@reusable-parts/user-state';
import { GetAllUserRoles } from '@reusable-parts/user-state/src/user-roles/loading-user-roles/loading-user-roles.actions';
import { GetAllUsers } from '@reusable-parts/user-state/src/users/loading-users/loading-users.actions';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { map, tap, takeUntil, filter } from 'rxjs/operators';
import {
  AddNewTeacherComponent,
  PotentialTeacherModel,
} from '../components/add-new-teacher/add-new-teacher.component';
import { TeacherModel } from '../components/view-teachers/view-teachers.component';
import {
  errorsSelector,
  loadingSelector,
  potentialTeacherModelsSelector,
  teacherModelsSelector,
  warningMessagesSelector,
} from './teachers-page.component.selectors';
import {
  isUpdatingAnyUserRolesSelector,
  hasAnyUserRoleUpdatedSelector,
} from '@reusable-parts/user-state/src/user-roles/updating-user-roles/updating-user-roles.selectors';
import {
  AttemptToUpdateUserRoles,
  ResetUpdateUserRoles,
} from '@reusable-parts/user-state/src/user-roles/updating-user-roles/updating-user-roles.actions';
import { FullSwingRoleTypes } from '../../../authorisation/roles';
import {
  ResetRemoveUserRoles,
  AttemptToRemoveUserRoles,
} from '@reusable-parts/user-state/src/user-roles/removing-user-roles/removing-user-roles.actions';

@Component({
  selector: 'jfc-teachers',
  templateUrl: './teachers-page.component.html',
  styleUrls: ['./teachers-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeachersPageComponent implements OnInit, OnDestroy {
  @ViewChild(AddNewTeacherComponent)
  public addNewTeacher: AddNewTeacherComponent;
  public loading$: Observable<boolean>;
  public errorMessages$: Observable<string[]>;
  public hasError$: Observable<boolean>;
  public warningMessages$: Observable<string[]>;
  public hasWarnings$: Observable<boolean>;

  public teachers$: Observable<TeacherModel[]>;
  public potentialTeachers$: Observable<PotentialTeacherModel[]>;
  public disableAddingNewTeacher$: Observable<boolean>;

  private onDestroy$ = new ReplaySubject();

  constructor(private store: Store<UserStateModule>) {}

  public ngOnInit(): void {
    this.store.dispatch(new ResetUpdateUserRoles());
    this.store.dispatch(new GetAllUserRoles());
    this.store.dispatch(new GetAllUsers());

    this.loading$ = this.store.select(loadingSelector);
    this.errorMessages$ = this.store.select(errorsSelector);
    this.hasError$ = this.errorMessages$.pipe(
      map(errorMessages => errorMessages.length > 0)
    );

    this.warningMessages$ = this.store.select(warningMessagesSelector);
    this.hasWarnings$ = this.warningMessages$.pipe(
      map(warningMessages => warningMessages.length > 0)
    );

    this.teachers$ = this.store.select(teacherModelsSelector);

    this.potentialTeachers$ = this.store.select(potentialTeacherModelsSelector);
    this.disableAddingNewTeacher$ = this.store.select(
      isUpdatingAnyUserRolesSelector
    );

    this.store
      .select(hasAnyUserRoleUpdatedSelector)
      .pipe(
        takeUntil(this.onDestroy$),
        filter(Boolean),
        tap(() => this.addNewTeacher.reset())
      )
      .subscribe();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }
  public remove(id: string) {
    this.store.dispatch(new ResetRemoveUserRoles());
    this.store.dispatch(
      new AttemptToRemoveUserRoles(id, FullSwingRoleTypes.Teacher)
    );
  }

  public addTeacher(id: string) {
    this.store.dispatch(new ResetUpdateUserRoles());
    this.store.dispatch(
      new AttemptToUpdateUserRoles(id, FullSwingRoleTypes.Teacher)
    );
  }
}
