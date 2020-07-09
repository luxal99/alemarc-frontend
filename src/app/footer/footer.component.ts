import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { FooterTranslate } from '../translate/footer';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public _snackBar: MatSnackBar) {


  }

  language = 'en';
  multiLanguage: Array<any> = [FooterTranslate.languageWord];
  // private _snackBar: MatSnackBar

  ngOnInit() {
    localStorage.getItem('language');
    this.language = localStorage.getItem('language');
  }
 
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  sendMessageForm = new FormGroup({
    name: new FormControl(""),
    lastname: new FormControl(""),
    mail: new FormControl(""),
    subject: new FormControl(""),
    message: new FormControl("")
  });

  sendMessage() {


  }

}
