import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { useAnimation } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(public http: HttpClient) { }

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
}
