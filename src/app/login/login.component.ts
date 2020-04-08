import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from '../service/admin.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  })

  


  constructor(public adminService: AdminService,public router:Router, public _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  login() {
    var username = this.loginForm.get('username').value;
    var password = this.loginForm.get('password').value;

    var user = { "username": username, "password": password }
    this.adminService.login(user).subscribe(data => {
      
      localStorage.setItem('token',data['token']);
      this.router.navigate([data['redirect']]);
      this.openSnackBar(data['message'],"Done");

    })
  }
 openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
