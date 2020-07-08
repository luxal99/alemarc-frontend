import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { useAnimation } from '@angular/animations';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClientService{

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

  sendSurvey(survey){
    return this.http.post("/client/saveSurvey",survey,{responseType:"text"});
  }


}
