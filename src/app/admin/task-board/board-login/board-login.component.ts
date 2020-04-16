import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientService } from 'src/app/service/client.service';
import { Router } from '@angular/router';
import { TaskService } from "../../../service/task.service";
import { BoardRegistrationDialogComponent } from './board-login-dialog/board-registration-dialog.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { empty } from 'rxjs';
import { TaskLoginService } from 'src/app/service/task-login.service';

@Component({
  selector: 'app-board-login',
  templateUrl: './board-login.component.html',
  styleUrls: ['./board-login.component.css']
})
export class BoardLoginComponent implements OnInit {

  constructor(public taskLoginService: TaskLoginService, public dialog: MatDialog, public _snackBar: MatSnackBar, public router: Router, public taskService: TaskService) { }

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

      if (data !== empty) {
        try {

          sessionStorage.setItem('user',JSON.stringify(data[0]));

          if (data[0].id_user_role.role_name === 'ADMIN') {

            localStorage.setItem("key", data[0].id_admin.secretKey)
            this.router.navigate(['/board']);

          } else if (data[0].id_user_role.role_name === 'CLIENT') {
            localStorage.setItem("key", data[0].id_client.secretKey)
            this.router.navigate(['/board']);
          }

        }
        catch {
          var err = new Error("User not found");

          this.openSnackBar(err.message, "");
        }
      }

    })

  }

  openRegistrationDialog(): void {
    const dialogRef = this.dialog.open(BoardRegistrationDialogComponent, {
      width: 'auto',
      backdropClass: 'loginDialog'
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }




}
