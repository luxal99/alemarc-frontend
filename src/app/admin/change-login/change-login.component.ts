import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-login',
  templateUrl: './change-login.component.html',
  styleUrls: ['./change-login.component.css']
})
export class ChangeLoginComponent implements OnInit {

  constructor( public _snackBar: MatSnackBar,private router: Router) { }

  changeLoginForm = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    newPassword: new FormControl("", Validators.required)
  })
  ngOnInit() {
  }

  changeLogin() {
    

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
