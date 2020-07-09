import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../service/auth.service';
import { User } from '../model/User';
import { error } from 'console';

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




  constructor(public router: Router, private authService: AuthService, public _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  login() {

    const user = new User(this.loginForm.get("username").value, this.loginForm.get("password").value);

    this.authService.auth(user).subscribe(data => {
      localStorage.setItem("token", data);
      this.router.navigate(['/admin'])

    }, error => {
      this.router.navigate(['/'])
    })



  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
