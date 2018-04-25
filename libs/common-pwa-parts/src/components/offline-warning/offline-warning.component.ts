import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { interval } from 'rxjs/observable/interval';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import {
  takeUntil,
  switchMap,
  map,
  distinctUntilChanged,
} from 'rxjs/operators';

@Component({
  selector: 'jfc-offline-warning',
  templateUrl: './offline-warning.component.html',
  styleUrls: ['./offline-warning.component.scss'],
})
export class OfflineWarningComponent implements OnInit, OnDestroy {
  public isOffline$: Observable<boolean>;

  private onDestroy$ = new ReplaySubject();
  public ngOnInit(): void {
    this.isOffline$ = interval(5000).pipe(
      takeUntil(this.onDestroy$),
      map(() => !navigator.onLine),
      distinctUntilChanged()
    );
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }
}
