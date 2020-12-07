import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/User';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {


  token: string = '$2b$10$luVmNPa2qSD2/IW2L7FuPOekTHG0TJatfvWUPcNsafY/fDWpbtXMG';

  constructor(private http: HttpClient, private router: Router) { }

  auth(user: User) {
    return this.http.post("/user/auth", user, { responseType: 'text' });
  }

  isValid(token: string) {
    if(token === this.token) return true;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {


    if (localStorage.getItem('token')) { // logged in so return true
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
