import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TaskLoginService } from 'src/app/service/task-login.service';

@Component({
  selector: 'app-user-profile-dialog',
  templateUrl: './user-profile-dialog.component.html',
  styleUrls: ['./user-profile-dialog.component.css']
})
export class UserProfileDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public taskLoginService:TaskLoginService,public _snackBar: MatSnackBar) { }

  theme;

  ngOnInit() {
    console.log(this.data);
    
    this.setTheme();
  }

  changePasswordForm = new FormGroup({
    username: new FormControl(this.data.username, Validators.required),
    old_password: new FormControl("", Validators.required),
    new_password: new FormControl("", Validators.required)
  })

  setTheme() {
    this.theme = localStorage.getItem('theme');
  }

  changePassword() {
    var username = this.changePasswordForm.get('username').value;
    var old_password = this.changePasswordForm.get('old_password').value;
    var new_password = this.changePasswordForm.get('new_password').value;

    var user = { username: username, old_password: old_password, new_password: new_password };

    this.taskLoginService.changePassword(user).subscribe(data=>{
        this.openSnackBar(data,"DONE");
        localStorage.removeItem("idUser");
        location.reload();  
    })
  }

  logout(){
    localStorage.removeItem("key");
    location.reload();
  }

    openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
