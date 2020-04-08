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
    this.printTest();
    window.scrollTo(0, 0);
    this.setDefault();
    this.language = localStorage.getItem('language');
    document.getElementById(localStorage.getItem('language')).style.color='#fff';

  }
  scrollToElement($element): void {
    $element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });

  }

  changeLanguage(changeLanguage) {
    localStorage.setItem("language", changeLanguage);
    document.getElementById(localStorage.getItem('language')).style.color='#fff';
    this.language = changeLanguage;
    document.getElementById('main').style.display = 'none';
    location.reload();
  }




  printTest() {

    $('.skill-div').mouseover(function () {
      $('.circle-text').each(function () {
        $(this).prop('Counter', 0).animate({
          Counter: $(this).data('value')
        }, {
          duration: 1000,
          easing: 'swing',
          step: function (now) {
            $(this).text(this.Counter.toFixed(0));
          }
        });
      });
    })

  }



}
