import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FactoryService<T> {

  protected route: string;

  constructor(protected http: HttpClient) { }

  save(entity: T) {
    return this.http.post(`${this.route}`, entity, { responseType: 'text' });
  }

  getAll(){
    return this.http.get(`${this.route}`,{responseType:'json'});
  }
}