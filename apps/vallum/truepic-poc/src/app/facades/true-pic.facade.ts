import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { of } from 'rxjs/observable/of';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TruePicFacade {
  public loading$ = new ReplaySubject<boolean>();
  public results$ = new ReplaySubject<any>();
  public errorMessage$ = new ReplaySubject<string>();

  public retrieve(id: string): void {
    if (!id) {
      return;
    }

    this.loading$.next(true);
    this.clearPreviousAttempt();

    of(null)
      .pipe(
        delay(2000),
        tap(() =>
          id.length < 4
            ? this.errorMessage$.next('Invalid id')
            : this.results$.next({
                id,
                isVerified: true,
                score: 99.4,
              }),
        ),
        tap(() => this.loading$.next(false)),
      )
      .subscribe();
  }

  private clearPreviousAttempt() {
    this.results$.next(null);
    this.errorMessage$.next(null);
  }
}
