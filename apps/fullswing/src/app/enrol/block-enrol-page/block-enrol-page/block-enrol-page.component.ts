import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Store } from '@ngrx/store';
import { BlockFeatureState } from '../../../state/block-state/block-feature.reducer';
import { ResetBlockPages } from '../../../state/block-state/block-pages/block-pages.actions';
import {
  ResetLoadBlockPages,
  GetMoreBlocks,
} from '../../../state/block-state/loading-block-pages/loading-block-pages.actions';
import { isLoadingSelector, modelSelector } from './block-enrol-page.component.selectors';
import { BlockCardModel } from '../components/block-card/block-card.component.model';
import { isArrayEmpty } from '@reusable-parts/common-functions';
import {
  ResetLoadStudentEnrolments,
  AttemptLoadStudentEnrolments,
} from '../../../state/student-enrolment-state/loading-student-enrolment/loading-student-enrolment.actions';
import { currentUserIdSelector } from '@reusable-parts/current-user-state/src/current-user/current-user.selectors';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { takeUntil, filter, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'jfc-block-enrol-page',
  templateUrl: './block-enrol-page.component.html',
  styleUrls: ['./block-enrol-page.component.scss'],
})
export class BlockEnrolPageComponent implements OnInit, OnDestroy {
  public loading$: Observable<boolean>;
  public errorMessages$: Observable<string[]>;
  public hasError$: Observable<boolean>;
  public warningMessages$: Observable<string[]>;
  public hasWarnings$: Observable<boolean>;

  public cards$: Observable<Array<{ title: string; cards: BlockCardModel[] }>>;
  public noAvailableBlocks$: Observable<boolean>;

  private onDestroy$ = new ReplaySubject<null>();

  constructor(private store: Store<BlockFeatureState>) {}

  public ngOnInit() {
    this.loading$ = this.store.select(isLoadingSelector);
    this.errorMessages$ = of(null);
    this.hasError$ = of(null);

    this.warningMessages$ = of(null);
    this.hasWarnings$ = of(null);

    this.cards$ = this.store.select(modelSelector);
    this.noAvailableBlocks$ = this.cards$.map(isArrayEmpty);

    this.store.dispatch(new ResetBlockPages());
    this.store.dispatch(new ResetLoadBlockPages());
    this.store.dispatch(new GetMoreBlocks());

    this.store.dispatch(new ResetLoadStudentEnrolments());
    this.store
      .select(currentUserIdSelector)
      .pipe(
        takeUntil(this.onDestroy$),
        filter(Boolean),
        distinctUntilChanged(),
        tap(userId => this.store.dispatch(new AttemptLoadStudentEnrolments(userId))),
      )
      .subscribe();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }

  public enrol(id: string): void {
    console.error('enrol', id);
  }
}
