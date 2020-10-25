import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/model/Blog';
import { BlogService } from 'src/app/service/blog.service';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  listOfBlogs: Array<Blog> = [];
  constructor(private blogService: BlogService) { }

  async ngOnInit(): Promise<void> {
    this.getBlogs();
  }

  config: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 200,
    slidesPerGroup: 3,
    loop: true,
    loopFillGroupWithBlank: false,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  }

  getBlogs() {
    this.blogService.getAll().subscribe(resp => {
      this.listOfBlogs = resp as Array<Blog>;
    })
  }

}
