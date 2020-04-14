import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskLoginService implements CanActivate {

  constructor(public http: HttpClient, public router: Router) { }

  register(user) {
    return this.http.post("/admin/board/register", user, { responseType: 'text' });
  }

  login(user) {
    return this.http.post('/admin/board/login', user, { responseType: 'json' })
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('idUser')) { // logged in so return true
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/board/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  getUserProfile(id_client){
    return this.http.get("/admin/board/getUserProfile/"+id_client,{responseType:'json'})
  }
}
