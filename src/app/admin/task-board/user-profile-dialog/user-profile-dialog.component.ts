import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile-dialog',
  templateUrl: './user-profile-dialog.component.html',
  styleUrls: ['./user-profile-dialog.component.css']
})
export class UserProfileDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  theme;

  ngOnInit() {
    this.setTheme();
  }

  changePasswordForm=new FormGroup({
    username : new FormControl(this.data.username,Validators.required),
    old_password: new FormControl("",Validators.required),
    new_password: new FormControl("",Validators.required)
  })

  setTheme() {
    this.theme = localStorage.getItem('theme');
  }
}
