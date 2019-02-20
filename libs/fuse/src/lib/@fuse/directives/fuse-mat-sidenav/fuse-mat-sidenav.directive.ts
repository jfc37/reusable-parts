import { Directive, Input, OnInit, HostListener, OnDestroy, HostBinding } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { MediaObserver } from '@angular/flex-layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseMatchMediaService } from '@reusable-parts/fuse/src/lib/@fuse/services/match-media.service';
import { FuseMatSidenavHelperService } from '@reusable-parts/fuse/src/lib/@fuse/directives/fuse-mat-sidenav/fuse-mat-sidenav.service';

@Directive({
  selector: '[fuseMatSidenavHelper]',
})
export class FuseMatSidenavHelperDirective implements OnInit, OnDestroy {
  @HostBinding('class.mat-is-locked-open')
  isLockedOpen: boolean;

  @Input()
  fuseMatSidenavHelper: string;

  @Input()
  matIsLockedOpen: string;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   *  {FuseMatchMediaService} _fuseMatchMediaService
   *  {FuseMatSidenavHelperService} _fuseMatSidenavHelperService
   *  {MatSidenav} _matSidenav
   *  {MediaObserver} _mediaObserver
   */
  constructor(
    private _fuseMatchMediaService: FuseMatchMediaService,
    private _fuseMatSidenavHelperService: FuseMatSidenavHelperService,
    private _matSidenav: MatSidenav,
    private _mediaObserver: MediaObserver,
  ) {
    // Set the defaults
    this.isLockedOpen = true;

    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Register the sidenav to the service
    this._fuseMatSidenavHelperService.setSidenav(this.fuseMatSidenavHelper, this._matSidenav);

    if (this._mediaObserver.isActive(this.matIsLockedOpen)) {
      this.isLockedOpen = true;
      this._matSidenav.mode = 'side';
      this._matSidenav.toggle(true);
    } else {
      this.isLockedOpen = false;
      this._matSidenav.mode = 'over';
      this._matSidenav.toggle(false);
    }

    this._fuseMatchMediaService.onMediaChange.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => {
      if (this._mediaObserver.isActive(this.matIsLockedOpen)) {
        this.isLockedOpen = true;
        this._matSidenav.mode = 'side';
        this._matSidenav.toggle(true);
      } else {
        this.isLockedOpen = false;
        this._matSidenav.mode = 'over';
        this._matSidenav.toggle(false);
      }
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}

@Directive({
  selector: '[fuseMatSidenavToggler]',
})
export class FuseMatSidenavTogglerDirective {
  @Input()
  fuseMatSidenavToggler: string;

  /**
   * Constructor
   *
   *  {FuseMatSidenavHelperService} _fuseMatSidenavHelperService
   */
  constructor(private _fuseMatSidenavHelperService: FuseMatSidenavHelperService) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * On click
   */
  @HostListener('click')
  onClick(): void {
    this._fuseMatSidenavHelperService.getSidenav(this.fuseMatSidenavToggler).toggle();
  }
}
