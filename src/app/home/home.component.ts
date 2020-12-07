import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Component, OnInit } from '@angular/core';

import { Blog } from '../model/Blog';
import { BlogService } from '../service/blog.service';
import { HomeTranslate } from '../translate/home';
import { Router } from '@angular/router';
import { error } from 'protractor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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


  constructor(private blogService: BlogService, private router: Router) { }

  ngOnInit() {
    window.scrollTo(0, 0)
    this.getAll();
  }

  scrollToElement($element): void {
    $element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }


  blog = null;

  getAll() {
    this.blogService.getAll().subscribe(data => {
      this.listOfBlogs = data
    }, error => {
      this.router.navigate(['/err'])
    })
  }



}
