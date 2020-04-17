import { Component, OnInit, ViewChild, Inject, Directive } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDatepicker, MatDatepickerInput, MatDialogRef } from '@angular/material';
import { AdminService } from 'src/app/service/admin.service';
import { ImgShowDialogComponent } from './img-show-dialog/img-show-dialog.component';
import { ChangeEvent, CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormGroup, FormControl } from '@angular/forms';
import { element } from 'protractor';
import { AngularFireStorage } from 'angularfire2/storage';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-task-dialog-detail',
  templateUrl: './task-dialog-detail.component.html',
  styleUrls: ['./task-dialog-detail.component.css']
})
export class TaskDialogDetailComponent implements OnInit {

  theme;



  // Use for show/hide edit inputs
  headerInput = true;
  descriptionInput = true;
  dueDate = true;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public adminService: AdminService, public dialog: MatDialog,
    private dialogRef: MatDialogRef<TaskDialogDetailComponent>, private afStorage: AngularFireStorage) { }


  // Set #editor tag.CKEditor
  @ViewChild('editor', { static: false }) editorComponent: CKEditorComponent;
  public Editor = ClassicEditor;
  // Data of editor
  editorData = '';
  description = '';

  // View child for due_date picket
  @ViewChild('picker', { static: false }) datePicker: MatDatepicker<Date>;


  @ViewChild('file', { static: false }) file
  public files: Set<File> = new Set()

  // List of attachment for task
  images: Array<any> = [];
  image_url;



  editTaskForm = new FormGroup({
    header: new FormControl(this.data.header),
    due_date: new FormControl()
  })

  ngOnInit() {
    this.theme = localStorage.getItem('theme');
  }

  // When we close file input dialog item added to list
  fileName;
  listOfFileNames: any = []


  upload(event: any) {
    for (const file of event.target.files) {
      this.afStorage.upload(file.name, file);

      this.fileName = file.name
      this.listOfFileNames.push(this.fileName)
    }
  }



  uploadToFirebase() {
    setTimeout(() => {
      for (const fileName of this.listOfFileNames) {
        const downloadUrl = this.afStorage.ref(fileName).getDownloadURL().subscribe(data => {
          console.log('Secon func', data);
          var attachment = { url: data }
          this.images.push(attachment);

        });

      }
    }, 500)

  }
  /**
   * @param headerInput 
   */
  showHeaderInput() {
    this.headerInput = false;
  }

  /**
  * @param descriptionInput 
  */
  showDescriptionInput() {
    if (this.descriptionInput) {
      this.descriptionInput = false;
    } else {
      this.descriptionInput = true;
    }
  }

  /**
  * @param due_date 
  */
  showDueDate() {

    if (this.dueDate) {
      this.dueDate = false;
      this.datePicker.open();
    } else {
      this.dueDate = true;
      this.datePicker.close();

    }
  }


  hideHeaderInput() {
    this.headerInput = true;
  }

  hideDescriptionInput() {
    this.descriptionInput = true;
  }

  // Update card status column 
  moveToInProgress() {
    var updatedTask = {
      id_task_card: this.data.id_task_card,
      header: this.data.header,
      visible: this.data.visible,
      description: this.data.description,
      due_date: this.data.due_date,
      id_card_status: 2

    }

    this.adminService.updateTask(updatedTask).subscribe(data => {
    })

    this.dialogRef.close();

  }

  // Update card status column 
  moveToToDo() {
    var updatedTask = {
      id_task_card: this.data.id_task_card,
      header: this.data.header,
      visible: this.data.visible,
      description: this.data.description,
      due_date: this.data.due_date,
      id_card_status: 1

    }

    this.adminService.updateTask(updatedTask).subscribe(data => {

    })

    this.dialogRef.close();

  }
  // Update card status column <
  moveToToDone() {
    var updatedTask = {
      id_task_card: this.data.id_task_card,
      header: this.data.header,
      visible: this.data.visible,
      description: this.data.description,
      due_date: this.data.due_date,
      id_card_status: 3

    }

    this.adminService.updateTask(updatedTask).subscribe(data => {
    })

    this.dialogRef.close();

  }

  // Open image
  openImg(url): void {
    const dialogRef = this.dialog.open(ImgShowDialogComponent, {
      width: 'auto',
      data: url
    });
  }

  updateTask() {

    var due_date = this.editTaskForm.get('due_date').value;

    if (due_date != null) {
      var shorter = String(due_date).substring(4, 10);
      this.data.due_date = shorter;
    }

    this.data.header = this.editTaskForm.get('header').value;
    this.data.description = this.editorComponent.editorInstance.getData();

    this.adminService.updateTask(this.data).subscribe(data => {
    })

    this.headerInput = true;
    this.dueDate = true;
    this.descriptionInput = true;

  }

  // Update colum to id = 4 and hide
  archiveTask() {
    this.data.visible = false;
    this.adminService.updateTask(this.data).subscribe(data => {
    })
  }


  removeAttachment(attachment) {

    var index = this.data.cardAttachmentList.indexOf(attachment);
    this.data.cardAttachmentList.splice(index, 1);

    var url = attachment.url;
    this.adminService.deleteAttachment(attachment).subscribe(data => {

    })
  }

   uploadAttachment() {

     console.log('Usao');

     setTimeout( () => {
      for (const fileName of this.listOfFileNames) {
         this.afStorage.ref(fileName).getDownloadURL().subscribe(async data => {
           console.log('Secon func', data);
          var attachment = { url: data }
           this.images.push(attachment);

        });

      }

      setTimeout(()=>{

      const attachment = { id_task_card: this.data.id_task_card, cardAttachmentList: this.images };

      console.log(this.images);
      
       this.adminService.updateAttachment(attachment).subscribe( data => {
      })
      },550)

    }, 500) ;



     console.log('Izasao');



  }
}

