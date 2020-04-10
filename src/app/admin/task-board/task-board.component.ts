import { Component, OnInit } from '@angular/core';
import { TaskDialogDetailComponent } from './task-dialog-detail/task-dialog-detail.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css']
})
export class TaskBoardComponent implements OnInit {

  constructor(public dialog:MatDialog) { }

  listOfBoard:any=[{title:"Task1"},{title:"Task2"}]

  ngOnInit() {
  }

  addTab(){
    this.listOfBoard.push({title:'Task3'})
  }

  openTaskDialog(task): void {
    const dialogRef = this.dialog.open(TaskDialogDetailComponent, {
      width: 'auto',
      data: task
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
