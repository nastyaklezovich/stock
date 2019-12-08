import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

import { AuthService } from "../services";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserVal;

    if (currentUser && currentUser.role) {
      if (route.data.roles && !this.authService.hasPermission(route.data.roles[0])) {
        this.router.navigate(["/"]);
        return false;
      }

      return true;
    }

    this.router.navigate(["#"], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
