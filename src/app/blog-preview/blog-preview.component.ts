import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog } from '../model/Blog';
import { BlogService } from '../service/blog.service';

import Swiper, { SwiperOptions } from 'swiper';
@Component({
  selector: 'app-blog-preview',
  templateUrl: './blog-preview.component.html',
  styleUrls: ['./blog-preview.component.css']
})
export class BlogPreviewComponent implements OnInit {

  constructor(private route: ActivatedRoute, private blogService: BlogService) { }

  ngOnInit() {
    this.findBlog();
  }

  config: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 100,
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

  blog: Blog;
  background = '';

  findBlog() {
    this.route.params.subscribe(params => {
      this.blogService.findById(params.id).subscribe(data => {
        this.blog = JSON.parse(JSON.stringify(data)) as Blog;
        this.background = this.blog.listOfImages[0].url;
        console.log(this.blog);
        
      })
    })

  }

}
