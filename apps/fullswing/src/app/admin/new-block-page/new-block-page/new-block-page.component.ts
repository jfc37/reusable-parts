import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { BlockFormModel } from '../components/block-form/block-form.component';
import { Store } from '@ngrx/store';
import { BlockFeatureState } from '../../../state/blocks/block-state/block-feature.reducer';
import {
  AttemptCreateBlock,
  ResetCreateBlock,
} from '../../../state/blocks/block-state/creating-block/creating-block.actions';
import {
  isCreatingBlockSelector,
  hasCreatedBlockSelector,
} from '../../../state/blocks/block-state/creating-block/creating-block.selectors';
import { map, takeUntil, filter, tap } from 'rxjs/operators';
import { warningMessagesSelector } from './new-block-page.component.selectors';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Router } from '@angular/router';
import {
  LoadUserRolesByRole,
  GetUserRolesByRole,
} from '@reusable-parts/user-state/src/user-roles/loading-user-roles/loading-user-roles.actions';
import { FullSwingRoleTypes } from '../../../authorisation/roles';

@Component({
  selector: 'jfc-new-block-page',
  templateUrl: './new-block-page.component.html',
  styleUrls: ['./new-block-page.component.scss'],
})
export class NewBlockPageComponent implements OnInit, OnDestroy {
  public saveButtonText$: Observable<string>;
  public disabled$: Observable<boolean>;
  public warningMessages$: Observable<string[]>;
  public hasWarnings$: Observable<boolean>;

  private onDestroy$ = new ReplaySubject();

  constructor(
    private store: Store<BlockFeatureState>,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.store.dispatch(new ResetCreateBlock());
    this.store.dispatch(new GetUserRolesByRole(FullSwingRoleTypes.Teacher));

    this.saveButtonText$ = of('Create');
    this.disabled$ = this.store.select(isCreatingBlockSelector);

    this.warningMessages$ = this.store.select(warningMessagesSelector);
    this.hasWarnings$ = this.warningMessages$.pipe(
      map(warningMessages => warningMessages.length > 0)
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
    console.error(model);
    // this.store.dispatch(new AttemptCreateBlock(model));
  }
}
