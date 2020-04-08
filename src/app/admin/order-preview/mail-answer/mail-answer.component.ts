import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'src/app/service/admin.service';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-mail-answer',
  templateUrl: './mail-answer.component.html',
  styleUrls: ['./mail-answer.component.css']
})
export class MailAnswerComponent implements OnInit {

  constructor(public adminService: AdminService,@Inject(MAT_DIALOG_DATA) public data: any) { }

  answerForm = new FormGroup({
    mail: new FormControl('', Validators.required),
    subject: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required)
  })

  ngOnInit() { 
  }

  sendMail(){
    var toMail = this.data.mail;
    var subject = this.answerForm.get('subject').value;
    var message = this.answerForm.get('message').value;

    var mail = {"toMail":toMail,"subject":subject,"message":message};

  this.adminService.sendMail(mail).subscribe(data=>{
 
  })

  }

}
