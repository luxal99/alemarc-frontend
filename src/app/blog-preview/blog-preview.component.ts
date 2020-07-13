import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../model/Blog';
import { BlogService } from '../service/blog.service';

import Swiper, { SwiperOptions } from 'swiper';
import { asLiteral } from '@angular/compiler/src/render3/view/util';
@Component({
  selector: 'app-blog-preview',
  templateUrl: './blog-preview.component.html',
  styleUrls: ['./blog-preview.component.css']
})
export class BlogPreviewComponent implements OnInit {

  constructor(private route: ActivatedRoute, private blogService: BlogService, private router: Router) { }

  ngOnInit() {
    this.topBlog()
    this.findBlog();
    this.getAll();
    this.getPopular();
  }

  listOfBlogs: Array<Blog> = [];
  popularBlogs: any = [];
  listOfTechnologies: any = [];
  listOfImages: any = [];

  config: SwiperOptions = {
    slidesPerView: 2,
    spaceBetween: 100,
    slidesPerGroup: 2,
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
  mobileConfig: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 100,
    slidesPerGroup: 1,
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




  blog;
  id;
  background = '';
  header;
  shortText;
  longText;
  numberOfViews;

  findBlog() {
    this.route.params.subscribe(params => {
      this.blogService.findById(params.id).subscribe(data => {
        this.blog = data
        this.background = this.blog.listOfImages[0].url;

        this.listOfTechnologies = this.blog.listOfTechnologies;
        this.listOfImages = this.blog.listOfImages;
        this.header = this.blog.header;
        this.longText = this.blog.longText;
        this.shortText = this.blog.shortText;
        this.numberOfViews = this.blog.numberOfViews;
        this.id = this.blog.id;

        this.blogService.incrementView(this.blog).subscribe(data => {
          console.log(data);

        }, err => {
          this.router.navigate(['/err']);
        })
      })
    })

  }

  getAll() {
    this.blogService.getAll().subscribe(data => {
      this.listOfBlogs = JSON.parse(JSON.stringify(data)) as Array<Blog>
    })
  }

  getPopular() {
    this.blogService.getMostPopular().subscribe(data => {
      this.popularBlogs = JSON.parse(JSON.stringify(data)) as Array<Blog>;
      console.log(data);

    })
  }

  topBlog() {
    window.scrollTo(0, 0)
  }

}
