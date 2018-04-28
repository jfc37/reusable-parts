import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserStateModule } from '@reusable-parts/user-state';
import { GetAllUserRoles } from '@reusable-parts/user-state/src/user-roles/loading-user-roles/loading-user-roles.actions';
import { GetAllUsers } from '@reusable-parts/user-state/src/users/loading-users/loading-users.actions';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { map } from 'rxjs/operators';
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
} from './teachers-page.component.selectors';

@Component({
  selector: 'jfc-teachers',
  templateUrl: './teachers-page.component.html',
  styleUrls: ['./teachers-page.component.scss'],
})
export class TeachersPageComponent implements OnInit {
  @ViewChild(AddNewTeacherComponent)
  public addNewTeacher: AddNewTeacherComponent;
  public loading$: Observable<boolean>;
  public errorMessages$: Observable<string[]>;
  public hasError$: Observable<boolean>;

  public teachers$: Observable<TeacherModel[]>;
  public potentialTeachers$: Observable<PotentialTeacherModel[]>;
  public resetAddTeachers$ = new ReplaySubject<boolean>();

  constructor(private store: Store<UserStateModule>) {}

  public ngOnInit(): void {
    this.store.dispatch(new GetAllUserRoles());
    this.store.dispatch(new GetAllUsers());

    this.loading$ = this.store.select(loadingSelector);
    this.errorMessages$ = this.store.select(errorsSelector);
    this.hasError$ = this.errorMessages$.pipe(
      map(errorMessages => errorMessages.length > 0)
    );

    this.teachers$ = this.store.select(teacherModelsSelector);
    this.potentialTeachers$ = this.store.select(potentialTeacherModelsSelector);
  }

  public remove(id: string) {
    console.error('REMOVING TEACHER', id);
  }

  public addTeacher(id: string) {
    console.error('ADD TEACHER', id);

    this.addNewTeacher.reset();
  }
}
