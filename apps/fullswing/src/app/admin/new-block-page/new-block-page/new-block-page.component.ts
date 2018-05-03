import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { BlockFormModel } from '../components/block-form/block-form.component';
import { Store } from '@ngrx/store';
import { BlockFeatureState } from '../../../state/block-state/block-feature.reducer';
import {
  AttemptCreateBlock,
  ResetCreateBlock,
} from '../../../state/block-state/creating-block/creating-block.actions';
import {
  isCreatingBlockSelector,
  hasCreatedBlockSelector,
} from '../../../state/block-state/creating-block/creating-block.selectors';
import { map, takeUntil, filter, tap, mergeMap } from 'rxjs/operators';
import {
  warningMessagesSelector,
  loadingSelector,
  fatalErrorMessagesSelector,
} from './new-block-page.component.selectors';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Router } from '@angular/router';
import {
  LoadUserRolesByRole,
  GetUserRolesByRole,
} from '@reusable-parts/user-state/src/user-roles/loading-user-roles/loading-user-roles.actions';
import { FullSwingRoleTypes } from '../../../authorisation/roles';
import {
  teacherIdsSelector,
  teacherOptionsSelector,
} from '../../../state/teachers-state/teachers.selectors';
import { merge } from 'rxjs/operators/merge';
import { GetUser } from '@reusable-parts/user-state/src/users/loading-users/loading-users.actions';
import { Block } from '../../../state/block-state/block';

@Component({
  selector: 'jfc-new-block-page',
  templateUrl: './new-block-page.component.html',
  styleUrls: ['./new-block-page.component.scss'],
})
export class NewBlockPageComponent implements OnInit, OnDestroy {
  public loading$: Observable<boolean>;
  public errorMessages$: Observable<string[]>;
  public hasError$: Observable<boolean>;

  public saveButtonText$: Observable<string>;
  public disabled$: Observable<boolean>;
  public warningMessages$: Observable<string[]>;
  public hasWarnings$: Observable<boolean>;
  public teachers$: Observable<any>;

  private onDestroy$ = new ReplaySubject();

  constructor(
    private store: Store<BlockFeatureState>,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.store.dispatch(new ResetCreateBlock());
    this.store.dispatch(new GetUserRolesByRole(FullSwingRoleTypes.Teacher));
    this.store
      .select(teacherIdsSelector)
      .pipe(
        takeUntil(this.onDestroy$),
        mergeMap(a => a),
        tap(id => this.store.dispatch(new GetUser(id)))
      )
      .subscribe();

    this.saveButtonText$ = of('Create');
    this.disabled$ = this.store.select(isCreatingBlockSelector);
    this.teachers$ = this.store.select(teacherOptionsSelector);

    this.warningMessages$ = this.store.select(warningMessagesSelector);
    this.hasWarnings$ = this.warningMessages$.pipe(
      map(warningMessages => warningMessages.length > 0)
    );
    this.loading$ = this.store.select(loadingSelector);
    this.errorMessages$ = this.store.select(fatalErrorMessagesSelector);
    this.hasError$ = this.errorMessages$.pipe(
      map(messages => messages.length > 0)
    );

    this.store
      .select(hasCreatedBlockSelector)
      .pipe(
        takeUntil(this.onDestroy$),
        filter(Boolean),
        tap(() => this.router.navigateByUrl('/app/admin/blocks'))
      )
      .subscribe();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }

  public save(model: BlockFormModel): void {
    const block: Block = {
      name: model.name,
      numberOfClasses: model.numberOfClasses,
      teacherIds: model.teacherIds,
      startDate: model.startDate,
      startTime: model.startTime,
      classLength: model.classLength,
      classCapacity: model.classCapacity,
      inviteOnly: model.inviteOnly,
    };
    this.store.dispatch(new AttemptCreateBlock(block));
  }
}
