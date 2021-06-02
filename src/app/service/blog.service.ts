import {Injectable} from '@angular/core';
import {FactoryService} from './factory.service';
import {Blog} from '../model/Blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService extends FactoryService<Blog> {

  route = 'blog';

  getMostPopular() {
    return this.http.post(`/${this.route}/popular`, {responseType: 'json'});
  }

  incrementView(blog) {
    return this.http.put(`/${this.route}/view`, blog, {responseType: 'text'});
  }
}
