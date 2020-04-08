import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-message-preview-dialog',
  templateUrl: './message-preview-dialog.component.html',
  styleUrls: ['./message-preview-dialog.component.css']
})
export class MessagePreviewDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public adminService:AdminService,public _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  sendMailForm = new FormGroup({
    name: new FormControl(""),
    lastname: new FormControl(""),
    toMail: new FormControl(""),
    subject: new FormControl(""),
    message: new FormControl("")
  });
  
  
  setValueToForm(){
    
  }
  sendMail(){
    var toMail = this.data.mail.mail;
    var subject = this.sendMailForm.get('subject').value;
    var message = this.sendMailForm.get('message').value;

    var mail = {"toMail":toMail,"subject":subject,"message":message};
    
    this.adminService.sendMail(mail).subscribe(data=>{
      this.openSnackBar(data,"DONE");
    })

  }

    openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }




}
