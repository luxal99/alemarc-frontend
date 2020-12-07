import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { FooterTranslate } from '../translate/footer';
import { MessageService } from '../service/message.service';
import { Message } from 'src/app/model/Message';
import { Router } from '@angular/router';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public _snackBar: MatSnackBar, private messageService: MessageService, private router: Router) {


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
    full_name: new FormControl(""),
    email: new FormControl(""),
    message: new FormControl(""),
  });

  sendMessage() {

    const message = new Message(this.sendMessageForm.get("full_name").value, this.sendMessageForm.get("email").value, this.sendMessageForm.get("message").value);

    this.messageService.save(message).subscribe(data => {
    }, err => {
      this.router.navigate(['/err']);
    })
  }

}
