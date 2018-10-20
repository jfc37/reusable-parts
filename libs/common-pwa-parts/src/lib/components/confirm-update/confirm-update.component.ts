import { Component, OnInit, OnDestroy } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { interval } from 'rxjs/observable/interval';
import { switchMap, takeUntil, filter, tap, take, takeWhile } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';

@Component({
  selector: 'jfc-confirm-update',
  templateUrl: './confirm-update.component.html',
  styleUrls: ['./confirm-update.component.scss'],
})
export class ConfirmUpdateComponent implements OnInit, OnDestroy {
  public hasUpdates = false;
  public isUpdating = false;
  public updateText = 'Update';
  private onDestroy$ = new ReplaySubject();

  constructor(public updates: SwUpdate) {}

  public ngOnInit() {
    if (this.updates.isEnabled) {
      // poll every 5 minutes
      interval(300000)
        .pipe(
          takeUntil(this.onDestroy$),
          takeWhile(() => !this.hasUpdates),
          switchMap(() => fromPromise(this.updates.checkForUpdate())),
          filter(Boolean),
          tap(() => (this.hasUpdates = true)),
          take(1),
        )
        .subscribe();

      this.updates.available
        .pipe(
          takeUntil(this.onDestroy$),
          filter(Boolean),
          tap(() => (this.hasUpdates = true)),
          take(1),
        )
        .subscribe();
    }
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }

  public update(): void {
    this.isUpdating = true;
    this.updateText = 'Updating...';
    this.updates.activateUpdate().then(() => {
      document.location.reload();
    });
  }
}
