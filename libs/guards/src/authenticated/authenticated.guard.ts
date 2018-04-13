import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FirebaseAuthService } from '@reusable-parts/guards/src/services/firebase-auth.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(
    private authService: FirebaseAuthService,
    private router: Router,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigate(['login']);
        }
      })
    );
  }
}
