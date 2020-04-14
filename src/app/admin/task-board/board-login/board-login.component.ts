import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientService } from 'src/app/service/client.service';
import { Router } from '@angular/router';
import { TaskService } from "../../../service/task.service";
import { BoardRegistrationDialogComponent } from './board-login-dialog/board-registration-dialog.component';
import { MatDialog } from '@angular/material';
import { empty } from 'rxjs';
import { TaskLoginService } from 'src/app/service/task-login.service';

@Component({
  selector: 'app-board-login',
  templateUrl: './board-login.component.html',
  styleUrls: ['./board-login.component.css']
})
export class BoardLoginComponent implements OnInit {

  constructor(public taskLoginService: TaskLoginService,public dialog:MatDialog, public router: Router, public taskService: TaskService) { }

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

    this.taskLoginService.login(user).subscribe(data => {
      
      if(data!==empty){
        console.log(data);
        
      localStorage.setItem("idUser",data[0].id_client.id_client)
      this.taskService.pushArray(data);
      this.router.navigate(['/board']);
      }

    })
  }

  openRegistrationDialog(): void {
    const dialogRef = this.dialog.open(BoardRegistrationDialogComponent, {
      width: 'auto',
      backdropClass:'loginDialog'
    });
  }



}
