import { Component, OnInit } from '@angular/core';
import { HomeTranslate } from '../translate/home';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  language = '';
  multiLanguage: Array<any> = [HomeTranslate.languagesWords];


  
  barChartLegend = true;
  barChartPlugins = [];
  barChartOptions: ChartOptions = {
    responsive: true,
  };

  barChartLabels: Label[] = ['Angular','Bootstrap','Html/Css'];
    barChartLabelsBackend: Label[] = ['Backend','Frontend'];
  barChartType: ChartType = 'bar';
  pieChartType: ChartType = 'pie';
  taskGraphList: any = [];

  barChartData: ChartDataSets[] = [{ data: [8,10,9,7], backgroundColor: ['#EC6B56', "#FFC154", "#47B39C"  ] }];
  barChartDataBackend: ChartDataSets[] = [{ data: [60,40], backgroundColor: ['#EC6B56', "#FFC154", "#47B39C"  ] }];
  
  
 
  constructor() { }

  setDefault() {
    var isLanguageSet = localStorage.getItem('language');

    if (isLanguageSet === null) {
      localStorage.setItem('language','en');
      this.language = localStorage.getItem('language');
    }
  }

  ngOnInit() {
   

  }
  scrollToElement($element): void {
    $element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });

  }





}
