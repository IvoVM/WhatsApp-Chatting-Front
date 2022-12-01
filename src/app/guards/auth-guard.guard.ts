import { AuthenticationService } from './../services/authentication.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate {
  token: any = null;
  loged: boolean = false;
  constructor(private authSvc: AuthenticationService, private router: Router) {}

  redirect(flag: boolean) {
    if (!flag) {
      this.router.navigateByUrl('');
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.token === null) {
      this.redirect(this.loged);
    } else {
      console.log(this.token)
      this.loged = true;
      this.redirect(this.loged);
    }
    return this.loged;
  }
}
