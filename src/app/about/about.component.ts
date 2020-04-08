import { Component, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { MatSidenav } from '@angular/material';
import { AboutTranslate } from '../translate/about';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  
  language = '';
  multiLanguage:Array<any>=[AboutTranslate.languagesWords];
  constructor() { }

  

  private sidenav: MatSidenav;

  ngOnInit() {
    this.swiper();
    this.testimonialSwiper();
    window.scrollTo(0,0);
   this.language= localStorage.getItem('language');
   document.getElementById(localStorage.getItem('language')).style.color='#fff';
   
  }

  toggleMenu(){
    this.toggleMenu();
    
  }

  swiper(){
    var swiper = new Swiper('.swiper-container', {
      slidesPerView: 4,
      spaceBetween: 30,
      centeredSlides: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });

  }

  testimonialSwiper(){
    var swiper = new Swiper('.swiper-container-testimonial', {
      slidesPerView: 3,
      spaceBetween: 30,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }

  scrollToElement($element): void {
    console.log($element);
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  
  }
  changeLanguage(changeLanguage) {
    document.getElementById('main').style.display = 'none';
    localStorage.setItem("language", changeLanguage);
    location.reload();
    this.language = changeLanguage;
  }

}
