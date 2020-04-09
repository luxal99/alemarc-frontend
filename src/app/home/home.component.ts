import { Component, OnInit } from '@angular/core';
import { HomeTranslate } from '../translate/home';
import Swiper, { SwiperOptions } from 'swiper';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isDisplay = true;
  toggleDisplay(){
    this.isDisplay = !this.isDisplay;
  }

  language = '';
  multiLanguage: Array<any> = [HomeTranslate.languagesWords];
  
  
  config: SwiperOptions = {
    pagination: {
      el: '.swiper-pagination',
    },  loop: true,
  }
 
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




    this.swiper();
    
   window.scrollTo(0,0);
   this.language= localStorage.getItem('language');
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
  swiper(){
    var swiper = new Swiper('.swiper-container', {
      pagination: {
        el: '.swiper-pagination',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

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
