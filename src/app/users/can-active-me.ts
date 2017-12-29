import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CanActiveMe implements CanActivate {
  canActivate(router: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)
    : Observable<boolean> | Promise<boolean> | boolean {
      return false;
  }
}
