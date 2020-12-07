import { Component, OnInit } from '@angular/core';
import { HomeTranslate } from '../translate/home';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as $ from 'jquery';
import Swiper, { SwiperOptions } from 'swiper';
import { Blog } from '../model/Blog';
import { BlogService } from '../service/blog.service';
import { error } from 'protractor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  language = '';
  multiLanguage: Array<any> = [HomeTranslate.languagesWords];

  listOfBlogs: Array<Blog> = [];


  barChartLegend = true;
  barChartPlugins = [];
  barChartOptions: ChartOptions = {
    responsive: true,
  };

  barChartLabels: Label[] = ['Angular', 'Bootstrap', 'Html/Css'];
  barChartLabelsBackend: Label[] = ['Backend', 'Frontend'];
  barChartType: ChartType = 'bar';
  pieChartType: ChartType = 'pie';
  taskGraphList: any = [];

  barChartData: ChartDataSets[] = [{ data: [8, 10, 9, 7], backgroundColor: ['#EC6B56', "#ffa900", "#47B39C"] }];
  barChartDataBackend: ChartDataSets[] = [{ data: [60, 40], backgroundColor: ['#EC6B56', "#ffa900", "#47B39C"] }];

  barChartDataMarko: ChartDataSets[] = [{ data: [30, 70], backgroundColor: ['#EC6B56', "#ffa900", "#47B39C"] }];


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
  constructor(private blogService: BlogService, private router: Router) { }

  ngOnInit() {
    window.scrollTo(0, 0)
    this.getAll()
  }
  
  scrollToElement($element): void {
    $element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }


  blog = null;

  getAll() {
    this.blogService.getAll().subscribe(data => {
      this.listOfBlogs = JSON.parse(JSON.stringify(data)) as Array<Blog>;
    }, error => {
      this.router.navigate(['/err'])
    })
  }



}
