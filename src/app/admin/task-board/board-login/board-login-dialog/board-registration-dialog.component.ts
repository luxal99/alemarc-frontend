import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'src/app/service/admin.service';
import { ClientService } from 'src/app/service/client.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { TaskLoginService } from 'src/app/service/task-login.service';

@Component({
  selector: 'app-board-registration',
  templateUrl: './board-registration-dialog.component.html',
  styleUrls: ['./board-registration-dialog.component.css']
})
export class BoardRegistrationDialogComponent implements OnInit {

  constructor(public taskLoginService:TaskLoginService,private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  registrationForm = new FormGroup({
    
    fullname: new FormControl("",Validators.required),
    mail: new FormControl("@",Validators.required),
    username: new FormControl("",Validators.required),
    password: new FormControl("",Validators.required)
  })

  register(){

    var fullname = this.registrationForm.get('fullname').value;
    var mail = this.registrationForm.get('mail').value;
    var username = this.registrationForm.get('username').value;
    var password = this.registrationForm.get('password').value;

    var user =
    {
      fullname:fullname,
      mail:mail,
      username:username,
      password:password
    }

    this.taskLoginService.register(user).subscribe(data=>{
      this.openSnackBar(data,"DONE");
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
