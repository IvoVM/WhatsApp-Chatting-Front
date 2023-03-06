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
  token!:string;
  loged: boolean = false;
  constructor( private router: Router) {}

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
    if (this.token === undefined) {
      this.redirect(this.loged);
    } else {
      this.loged = true;
      this.redirect(this.loged);
    }
    return this.loged;
  }
}
