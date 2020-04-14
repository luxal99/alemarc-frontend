import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { useAnimation } from '@angular/animations';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClientService implements CanActivate{

  constructor(public http: HttpClient,public router:Router) { }

  saveClient(client) {
    return this.http.post("/client/saveClient", client, { responseType: 'json' });
  }

  sendMessage(message) {
    return this.http.post("/client/sendMessage", message, { responseType: 'text' });
  }

  getPaymentOptions() {
    return this.http.get("/client/getPaymentOptions", { responseType: 'json' });
  }
  getWebisteTypes() {
    return this.http.get("/client/getWebsiteTypes", { responseType: 'json' });
  }

  getMaintenancePacket() {
    return this.http.get('/client/getMaintenacePacket', { responseType: 'json' });
  }
  sendOrder(order) {
    return this.http.post("/client/createOrder", order, { responseType: 'text' });
  }

  register(user) {
    return this.http.post("/admin/board/register", user, { responseType: 'text' });
  }

  login(user) {
    return this.http.post('/admin/board/login', user, { responseType: 'json' })
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('idClient')) { // logged in so return true
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/board/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
