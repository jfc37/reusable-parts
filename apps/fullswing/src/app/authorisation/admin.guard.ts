import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HasRoleGuard } from '@reusable-parts/guards';

@Injectable()
export class AdminGuard extends HasRoleGuard {
  protected role = 'admin';
}
