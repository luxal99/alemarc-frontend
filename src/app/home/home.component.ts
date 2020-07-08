import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeTranslate } from '../translate/home';
import * as $ from 'jquery';
import { AdminService } from '../service/admin.service';
import { MatDialog } from '@angular/material';
import { SurveyDialogComponent } from './survey-dialog/survey-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Return div with list of blogs
  listOfBlogs:any=[];
  

  language = '';
  multiLanguage: Array<any> = [HomeTranslate.languagesWords];

  constructor(public adminServie:AdminService,public dialog: MatDialog) { }

  // Function which set English to default language
  setDefault() {
    var isLanguageSet = localStorage.getItem('language');

    if (isLanguageSet === null) {
      localStorage.setItem('language', 'en');
      this.language = localStorage.getItem('language');
    }
  }

  ngOnInit() {

    this.printTest();
    this.openSurveyDialog();
    window.scrollTo(0, 0);
    this.setDefault();
    this.language = localStorage.getItem('language');
    document.getElementById(localStorage.getItem('language')).style.color = '#fff';
    window.scrollTo(0, 0);
    this.language = localStorage.getItem('language');
    document.getElementById(localStorage.getItem('language')).style.color = '#fff';

    this.getBlogs();
  }

  // Function for smooth scroll
  scrollToElement($element): void {
    $element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });

  }

  
  changeLanguage(changeLanguage) {
    localStorage.setItem("language", changeLanguage);
    document.getElementById(localStorage.getItem('language')).style.color = '#fff';
    this.language = changeLanguage;
    document.getElementById('main').style.display = 'none';
    location.reload();
  }


  getBlogs(){
    this.adminServie.getBlogs().subscribe(data=>{
      this.listOfBlogs = data;
      console.log(this.listOfBlogs[0].images);
      
      
    })
  }

  openSurveyDialog(): void {
    const dialogRef = this.dialog.open(SurveyDialogComponent, {
      width: 'auto',
      backdropClass:"surveyClass"
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
