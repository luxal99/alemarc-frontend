import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/User';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthResponse} from '../model/AuthResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {


  constructor(private http: HttpClient, private router: Router) {
  }

  auth(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/user/auth', user, {responseType: 'json'});
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (localStorage.getItem('token')) { // logged in so return true
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
