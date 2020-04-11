import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { AdminService } from 'src/app/service/admin.service';
import { ImgShowDialogComponent } from './img-show-dialog/img-show-dialog.component';

@Component({
  selector: 'app-task-dialog-detail',
  templateUrl: './task-dialog-detail.component.html',
  styleUrls: ['./task-dialog-detail.component.css']
})
export class TaskDialogDetailComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public adminService:AdminService,public dialog:MatDialog) { }

  ngOnInit() {
    console.log(this.data);

  }

  moveToInProgress() {
    var updatedTask = {
      id_task_card:this.data.id_task_card,
      header: this.data.header,
      description: this.data.description,
      due_date:this.data.due_date,
      id_card_status:2

    }

    this.adminService.updateTask(updatedTask).subscribe(data=>{
      console.log(data);
      
    })

  }

  moveToToDo() {
    var updatedTask = {
      id_task_card:this.data.id_task_card,
      header: this.data.header,
      description: this.data.description,
      due_date:this.data.due_date,
      id_card_status:1

    }

    this.adminService.updateTask(updatedTask).subscribe(data=>{
      console.log(data);
      
    })

  }

  moveToToDone() {
    var updatedTask = {
      id_task_card:this.data.id_task_card,
      header: this.data.header,
      description: this.data.description,
      due_date:this.data.due_date,
      id_card_status:3

    }

    this.adminService.updateTask(updatedTask).subscribe(data=>{
      console.log(data);
      
    })

  }

  openImg(url): void {
    const dialogRef = this.dialog.open(ImgShowDialogComponent, {
     width:'auto',
      data: url
    });
  }

}
