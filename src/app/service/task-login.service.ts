import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskLoginService implements CanActivate {

  private roles: Array<any> = [];
  loggedUser = null

  constructor(public http: HttpClient, public router: Router) { }

  register(user) {
    return this.http.post("/admin/board/register", user, { responseType: 'text' });
  }

  login(user) {
    return this.http.post('/admin/board/login', user, { responseType: 'json' })
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {


    if (localStorage.getItem('key')) { // logged in so return true
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/board/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  getUserProfile(user) {
    return this.http.post('/admin/board/getUserProfile', user, { responseType: 'json' })
  }

  changePassword(user) {
    return this.http.put("/admin/board/changePassword", user, { responseType: 'text' });
  }

  getUserByKey(key) {
    return this.http.post("/admin/board/getUserByKey", key, { responseType: 'json' })
  }
  getUser() {
    return JSON.parse(localStorage.getItem('user'))
  }
}
