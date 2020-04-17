import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'src/app/service/admin.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-create-board-dialog',
  templateUrl: './create-board-dialog.component.html',
  styleUrls: ['./create-board-dialog.component.css']
})
export class CreateBoardDialogComponent implements OnInit {

  theme = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public taskService: TaskService) { }

  ngOnInit() {
    this.theme = localStorage.getItem('theme');
    console.log(this.data);
    
  }

  boardForm = new FormGroup({
    title: new FormControl("", Validators.required)
  })

  createNewBoard() {
    var title = this.boardForm.get('title').value;
    var client = this.data
    var board = {title:title,id_client:client}
    
    console.log(board);
    
    this.taskService.createNewTaskBoard(board).subscribe(data => {
    })
  }

}
