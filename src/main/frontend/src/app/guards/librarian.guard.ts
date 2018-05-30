import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Persona} from "../domains/persona";

@Injectable()
export class LibrarianGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) as Persona;
    if (currentUser) {
      return currentUser.role.name === 'librarian';
    } else {
      const result = confirm('Доступ заблокирован!\nХотите войти?');
      if (result) {
        this.router.navigate(['sing-in']);
      }
      return false;
    }
  }
}
