import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'src/app/service/admin.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-login',
  templateUrl: './change-login.component.html',
  styleUrls: ['./change-login.component.css']
})
export class ChangeLoginComponent implements OnInit {

  constructor(private adminService: AdminService, public _snackBar: MatSnackBar,private router: Router) { }

  changeLoginForm = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    newPassword: new FormControl("", Validators.required)
  })
  ngOnInit() {
  }

  changeLogin() {
    let id_admin = localStorage.getItem('adminID');
    let username = this.changeLoginForm.get('username').value;
    let password = this.changeLoginForm.get('password').value;
    let newPassword = this.changeLoginForm.get('newPassword').value;

    var user = { "id_admin": id_admin, "username": username, "password": password, "newPassword": newPassword };

    this.adminService.changeLogin(user).subscribe(data => {

      if (data === "true") {
        localStorage.removeItem('adminID');
        localStorage.setItem('isPasswordChanged','true');
        
      }else{
        this.openSnackBar(data, "DONE");
      }
      


    })

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
