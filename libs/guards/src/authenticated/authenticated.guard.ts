import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FirebaseAuthService } from '@reusable-parts/guards/src/services/firebase-auth.service';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private authService: FirebaseAuthService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isAuthenticated();
  }
}
