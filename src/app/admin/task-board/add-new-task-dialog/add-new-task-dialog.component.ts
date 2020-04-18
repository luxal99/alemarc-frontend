import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ChangeEvent, CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'src/app/service/admin.service';
import { MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { AngularFireStorage } from 'angularfire2/storage';
import * as firebase from 'firebase'

@Component({
  selector: 'app-add-new-task-dialog',
  templateUrl: './add-new-task-dialog.component.html',
  styleUrls: ['./add-new-task-dialog.component.css']
})
export class AddNewTaskDialogComponent implements OnInit {

  // Value of theme 
  theme;
  uploaded = ''
  url;
  isUploaded = false;
  updloadedStatus = 'Uploaded';
  notUploaded = 'Not uploaded'

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public _snackBar: MatSnackBar, public adminService: AdminService, private afStorage: AngularFireStorage) {
  }

  @ViewChild('file', { static: false }) file
  public files: Set<File> = new Set()

  /**
   * List where we push @files
   */
  images: Array<any> = [];

  /**
   * Variable where we bind @FormData
   *  and send to backend
   */
  image_url;


  // Attributes for CKEditor
  @ViewChild('editor', { static: false }) editorComponent: CKEditorComponent;
  public Editor = ClassicEditor;
  editorData = '';
  description = '';


  ngOnInit() {
    // Set theme from localstorage
    this.theme = localStorage.getItem('theme');
  }


  /**
   * Add files in @images list on
   * open/close file chooser
   */


  fileName;
  listOfFileNames: any = []


  upload(event: any) {
    for (const file of event.target.files) {
      const size = Math.round(file.size / 1000)

      if (size > 1700) {
        this.openSnackBar(`File is too large: ${file.name}`, "DONE")
      } else {

        this.afStorage.upload(file.name, file);

        this.fileName = file.name
        this.listOfFileNames.push(this.fileName)
      }

    }
  }



  uploadToFirebase() {
    console.log(this.listOfFileNames.length);

    setTimeout(() => {
      for (const fileName of this.listOfFileNames) {
        const downloadUrl = this.afStorage.ref(fileName).getDownloadURL().subscribe(data => {
          console.log('Secon func', data);
          var attachment = { url: data }
          this.images.push(attachment);

        });

      }

      this.isUploaded = true;
    }, 800)



  }

  // Input form for tasks
  taskForm = new FormGroup({
    header: new FormControl("", Validators.required),
    text: new FormControl("", Validators.required),
    due_date: new FormControl("", Validators.required)
  })

  saveTask() {

    // Set atribute
    var header = this.taskForm.get('header').value;
    var text = this.taskForm.get('text').value;
    var due_date = this.taskForm.get('due_date').value;
    var description = this.editorComponent.editorInstance.getData();

    // Date format convert to String
    var shorter = String(due_date).substring(4, 10);



    console.log(this.images);


    var task = {
      header: header,
      text: text,
      due_date: shorter,
      description: description,
      id_task_board: this.data.id_task_board,
      id_card_type: 1,
      visible: true,
      cardAttachmentList: this.images
    };
    this.adminService.createNewTask(task).subscribe(data => {
    })
  }

  removeImageFromList(item) {
    this.files.delete(item);
    var index = this.images.indexOf(item);
    this.images.splice(index, 1);

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }


}
