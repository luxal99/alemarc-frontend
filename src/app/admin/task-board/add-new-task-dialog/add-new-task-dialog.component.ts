import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ChangeEvent, CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'src/app/service/admin.service';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-new-task-dialog',
  templateUrl: './add-new-task-dialog.component.html',
  styleUrls: ['./add-new-task-dialog.component.css']
})
export class AddNewTaskDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public adminService: AdminService) { }

  @ViewChild('file', { static: false }) file
  public files: Set<File> = new Set()

  images: Array<any> = [];
  image_url;



  @ViewChild('editor', { static: false }) editorComponentSr: CKEditorComponent;
  public Editor = ClassicEditor;
  editorData = '';
  description = '';


  ngOnInit() {
    console.log(this.data);

  }

  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);
        this.images.push('assets/img/blog/' + files[key].name)


      }
    }
  }

  taskForm = new FormGroup({
    header: new FormControl("", Validators.required),
    text: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    due_date: new FormControl("", Validators.required)
  })


  saveTask(){
    
  }


}
