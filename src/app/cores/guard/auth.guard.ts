import { Injectable } from '@angular/core';
import {
  CanActivateChild,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

@Injectable()
class AuthGuard implements CanActivateChild, CanActivate {
  guard() {
    return true;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.guard();
  }

  canActivate(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.guard();
  }
}

export {
  AuthGuard
};
