import { Injectable, Inject } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FirebaseAuthService } from '@reusable-parts/guards/src/services/firebase-auth.service';
import { tap } from 'rxjs/operators';

@Injectable()
export abstract class HasRoleGuard implements CanActivate {
  protected abstract role: string;

  constructor(
    @Inject('unauthenticatedRedirectRoute') private redirectRoute: string,
    private authService: FirebaseAuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.hasRole(this.role).pipe(
      tap(hasRole => {
        if (!hasRole) {
          this.router.navigate([this.redirectRoute]);
        }
      })
    );
  }
}
