import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService implements CanActivate {

  constructor(public http: HttpClient, private router: Router) { }

  getAllMessages(token) {
    return this.http.get("/admin/getAllMessages/" + token, { responseType: 'json' });
  }
  deleteMail(id_mail) {
    return this.http.delete("/admin/deleteMessage/" + id_mail, { responseType: 'text' });
  }
  sendMail(mail) {
    return this.http.post("/admin/sendMail", mail, { responseType: 'text' });
  }
  getAllOrders() {
    return this.http.get("/admin/getAllOrders", { responseType: 'json' });
  }
  deleteOrder(id_site_order) {
    return this.http.delete('/admin/deleteOrder/' + id_site_order, { responseType: 'text' });
  }
  login(user) {
    return this.http.post('/admin/getPassword', user, { responseType: 'json' });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return true;
  }

  logout(isAuthenticated) {
    return this.http.post('/admin/logout', isAuthenticated, { responseType: 'text' });
  }
  changeLogin(user) {
    return this.http.put('/admin/changeLogin', user, { responseType: 'text' });
  }
}
