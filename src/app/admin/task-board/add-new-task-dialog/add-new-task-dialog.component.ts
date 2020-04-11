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



  @ViewChild('editor', { static: false }) editorComponent: CKEditorComponent;
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
        var attachment = {url:'assets/img/task/' + files[key].name}
        this.images.push(attachment)


      }
    }
  }

  taskForm = new FormGroup({
    header: new FormControl("", Validators.required),
    text: new FormControl("", Validators.required),
    due_date: new FormControl("", Validators.required)
  })


  saveTask(){
    var header = this.taskForm.get('header').value;
    var text= this.taskForm.get('text').value;
    var due_date = this.taskForm.get('due_date').value;
    var description = this.editorComponent.editorInstance.getData();


    var shorter = String(due_date).substring(4,10);
    console.log(shorter);
        
    


   if(this.files.size>0){
    this.files.forEach(element => {
      const formData: FormData = new FormData();
      formData.append('image_url', element)
      this.adminService.uploadAttachment(formData).subscribe(data => {
      })
    });

   }

    var task = {header:header,
                text:text,
                due_date:shorter,
                description:description,
                id_task_board:this.data.id_task_board,
                id_card_type:1,
                cardAttachmentList:this.images};

                console.log(task);

                this.adminService.createNewTask(task).subscribe(data=>{
                  console.log(data);
                  
                })
                

  }


}
