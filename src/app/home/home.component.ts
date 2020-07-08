import { Component, OnInit } from '@angular/core';
import { HomeTranslate } from '../translate/home';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  language = '';
  multiLanguage: Array<any> = [HomeTranslate.languagesWords];
  
  
 
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
