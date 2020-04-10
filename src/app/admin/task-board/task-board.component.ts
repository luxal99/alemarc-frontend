import { Component, OnInit } from '@angular/core';
import { TaskDialogDetailComponent } from './task-dialog-detail/task-dialog-detail.component';
import { MatDialog } from '@angular/material';
import { AdminService } from 'src/app/service/admin.service';
import { CreateBoardDialogComponent } from './create-board-dialog/create-board-dialog.component';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css']
})
export class TaskBoardComponent implements OnInit {

  constructor(public dialog:MatDialog,public adminService:AdminService) { }

  listOfBoard:any=[];

  ngOnInit() {
    this.getBoards();
  }

  openTaskDialog(task): void {
    const dialogRef = this.dialog.open(TaskDialogDetailComponent, {
      width: 'auto',
      data: task
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openCreateBoardDialog(): void {
    const dialogRef = this.dialog.open(CreateBoardDialogComponent, {
      width: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getBoards();
    });
  }

  getBoards(){
    this.adminService.getBoard().subscribe(data=>{
      this.listOfBoard = data;
    })
  }


}
