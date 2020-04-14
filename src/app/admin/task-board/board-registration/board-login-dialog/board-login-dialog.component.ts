import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientService } from 'src/app/service/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board-login-dialog',
  templateUrl: './board-login-dialog.component.html',
  styleUrls: ['./board-login-dialog.component.css']
})
export class BoardLoginDialogComponent implements OnInit {

  constructor(public clientService: ClientService, public router: Router) { }

  ngOnInit() {
  }

  loginForm = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  })

  login() {

    var username = this.loginForm.get('username').value;
    var password = this.loginForm.get('password').value;

    var user = {
      username: username,
      password: password
    }

    this.clientService.login(user).subscribe(data=>{
      console.log(data);
      
    })
  }



}
