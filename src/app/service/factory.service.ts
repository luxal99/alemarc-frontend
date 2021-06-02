import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FactoryService<T> {

  protected route: string;

  constructor(protected http: HttpClient) {
  }

  save(entity: T) {
    return this.http.post(`/${this.route}`, entity, {responseType: 'text', headers: {'auth-token': localStorage.getItem('token')}});
  }

  findById(id) {
    return this.http.get(`/${this.route}/` + id, {responseType: 'json'});
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`/${this.route}`, {responseType: 'json'});
  }

  update(entity: T) {
    return this.http.put(`/${this.route}`, entity, {responseType: 'text'});
  }
}
