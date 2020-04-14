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

  // Value of theme 
  theme;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public adminService: AdminService) {
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
  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);
        var attachment = { url: 'assets/img/task/' + files[key].name }
        this.images.push(attachment)
      }
    }

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

    // Upload files if @files>0
    if (this.files.size > 0) {
      this.files.forEach(element => {
        const formData: FormData = new FormData();
        formData.append('image_url', element)
        this.adminService.uploadAttachment(formData).subscribe(data => {
          console.log(data);

        })
      });

    }

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

}
