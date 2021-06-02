import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VerifyService {

  constructor(private http: HttpClient) {
  }

  verifyToken() {
    return this.http.get('/jwt', {headers: {'auth-token': localStorage.getItem('token')}});
  }
}
