import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ClientService } from '../service/client.service';
import { MatSnackBar } from '@angular/material';
import { FooterTranslate } from '../translate/footer';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public clientService: ClientService, public _snackBar: MatSnackBar) {


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
    let name = this.sendMessageForm.get('name').value;
    let lastname = this.sendMessageForm.get('lastname').value;
    let subject = this.sendMessageForm.get('subject').value;
    let message = this.sendMessageForm.get('message').value;
    let mail = this.sendMessageForm.get('mail').value;

    var client = { "name": name, "lastname": lastname, "mail": mail };

    this.clientService.saveClient(client).subscribe(data => {
      var messageObj = { "id_client": data[0].id_client, "subject": subject, "message": message }

      this.clientService.sendMessage(messageObj).subscribe(data => {
        this.openSnackBar(data, "Done");

      })


    })


  }

}
