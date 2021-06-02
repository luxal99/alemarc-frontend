import {Pipe, PipeTransform} from '@angular/core';
import {Blog} from '../model/Blog';

@Pipe({
  name: 'blog'
})
export class BlogPipe implements PipeTransform {

  transform(listOfBlogs: Array<Blog>, searchText: string): unknown {

    if (!listOfBlogs) {
      return [];
    }

    if (!searchText) {
      return listOfBlogs;
    }

    return listOfBlogs.filter((blog) => blog.header.toLowerCase().includes(searchText.toLowerCase()));
  }

}
