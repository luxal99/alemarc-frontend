import { Component, OnInit, ViewChild, Inject, Directive } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { AdminService } from 'src/app/service/admin.service';
import { ImgShowDialogComponent } from './img-show-dialog/img-show-dialog.component';
import { ChangeEvent, CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-task-dialog-detail',
  templateUrl: './task-dialog-detail.component.html',
  styleUrls: ['./task-dialog-detail.component.css']
})
export class TaskDialogDetailComponent implements OnInit {

  headerInput = true;
  descriptionInput = true;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public adminService: AdminService, public dialog: MatDialog) { }


  @ViewChild('editor', { static: false }) editorComponent: CKEditorComponent;
  public Editor = ClassicEditor;
  editorData = '';
  description = '';

  editTaskForm = new FormGroup({
    header: new FormControl(this.data.header)
  })

  ngOnInit() {
    console.log(this.data);

  }

  showHeaderInput() {
    this.headerInput = false;
  }

  showDescriptionInput() {
    if (this.descriptionInput) {
      this.descriptionInput = false;
    } else {
      this.descriptionInput = true;
    }
  }

  hideHeaderInput() {
    this.headerInput = true;
  }

  hideDescriptionInput() {
    this.descriptionInput = true;
  }

  moveToInProgress() {
    var updatedTask = {
      id_task_card: this.data.id_task_card,
      header: this.data.header,
      description: this.data.description,
      due_date: this.data.due_date,
      id_card_status: 2

    }

    this.adminService.updateTask(updatedTask).subscribe(data => {
      console.log(data);

    })

  }

  moveToToDo() {
    var updatedTask = {
      id_task_card: this.data.id_task_card,
      header: this.data.header,
      description: this.data.description,
      due_date: this.data.due_date,
      id_card_status: 1

    }

    this.adminService.updateTask(updatedTask).subscribe(data => {
      console.log(data);

    })

  }

  moveToToDone() {
    var updatedTask = {
      id_task_card: this.data.id_task_card,
      header: this.data.header,
      description: this.data.description,
      due_date: this.data.due_date,
      id_card_status: 3

    }

    this.adminService.updateTask(updatedTask).subscribe(data => {
      console.log(data);

    })

  }

  openImg(url): void {
    const dialogRef = this.dialog.open(ImgShowDialogComponent, {
      width: 'auto',
      data: url
    });
  }

  updateTask() {
  
    this.data.header = this.editTaskForm.get('header').value;
    this.data.description =this.editorComponent.editorInstance.getData();

    this.adminService.updateTask(this.data).subscribe(data=>{
      console.log(data);
      
    })
    
  }

}
