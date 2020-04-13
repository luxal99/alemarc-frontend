import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-create-board-dialog',
  templateUrl: './create-board-dialog.component.html',
  styleUrls: ['./create-board-dialog.component.css']
})
export class CreateBoardDialogComponent implements OnInit {

  theme = '';

  constructor(public adminService: AdminService) { }

  ngOnInit() {
    this.theme = localStorage.getItem('theme');
  }

  boardForm = new FormGroup({
    title: new FormControl("", Validators.required)
  })

  createNewBoard() {
    var title = this.boardForm.get('title').value;

    var board = {title:title}
    
    this.adminService.createNewTaskBoard(board).subscribe(data => {
      console.log(data);

    })
  }

}
