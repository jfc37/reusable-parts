import { ChangeDetectorRef, Component, HostBinding, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from '../../../sidebar/sidebar.component.model';
import { fuseAnimations } from '@reusable-parts/fuse';

@Component({
  selector: 'stateless-nav-vertical-collapsable',
  templateUrl: './collapsable.component.html',
  styleUrls: ['./collapsable.component.scss'],
  animations: fuseAnimations,
})
export class NavVerticalCollapsableComponent {
  @Input()
  item: MenuItem;

  @HostBinding('class')
  classes = 'nav-collapsable nav-item';

  @HostBinding('class.open')
  public isOpen = false;

  /**
   * Constructor
   *
   *  {ChangeDetectorRef} _changeDetectorRef
   *  {FuseNavigationService} _fuseNavigationService
   *  {Router} _router
   */
  constructor(private _changeDetectorRef: ChangeDetectorRef, private _router: Router) {
    // Set the private defaults
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Check if the url can be found in
    // one of the children of this item
    if (this.isUrlInChildren(this.item, this._router.url)) {
      this.expand();
    } else {
      this.collapse();
    }
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle collapse
   *
   *  ev
   */
  toggleOpen(ev): void {
    ev.preventDefault();

    this.isOpen = !this.isOpen;
  }

  /**
   * Expand the collapsable navigation
   */
  expand(): void {
    if (this.isOpen) {
      return;
    }

    this.isOpen = true;

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

  /**
   * Collapse the collapsable navigation
   */
  collapse(): void {
    if (!this.isOpen) {
      return;
    }

    this.isOpen = false;

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

  /**
   * Check if the given parent has the
   * given item in one of its children
   *
   *  parent
   *  item
   *  {boolean}
   */
  isChildrenOf(parent, item): boolean {
    if (!parent.children) {
      return false;
    }

    if (parent.children.indexOf(item) !== -1) {
      return true;
    }

    for (const children of parent.children) {
      if (children.children) {
        return this.isChildrenOf(children, item);
      }
    }
  }

  /**
   * Check if the given url can be found
   * in one of the given parent's children
   *
   *  parent
   *  url
   *  {boolean}
   */
  isUrlInChildren(parent, url): boolean {
    if (!parent.children) {
      return false;
    }

    for (let i = 0; i < parent.children.length; i++) {
      if (parent.children[i].children) {
        if (this.isUrlInChildren(parent.children[i], url)) {
          return true;
        }
      }

      if (parent.children[i].url === url || url.includes(parent.children[i].url)) {
        return true;
      }
    }

    return false;
  }
}
