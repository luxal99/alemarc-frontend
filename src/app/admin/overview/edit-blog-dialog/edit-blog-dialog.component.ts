import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import { Blog } from 'src/app/model/Blog';
import { BlogService } from 'src/app/service/blog.service';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-edit-blog-dialog',
  templateUrl: './edit-blog-dialog.component.html',
  styleUrls: ['./edit-blog-dialog.component.css']
})
export class EditBlogDialogComponent implements OnInit {

  @ViewChild('editor', { static: false }) editorComponent: CKEditorComponent;
  public Editor = ClassicEditor;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Blog, private blogService: BlogService) { }

  headerForm = new FormGroup({
    header: new FormControl(this.data.header),
    shortText: new FormControl(this.data.shortText)
  })

  ngOnInit() {

  }

  errorHandler(event) {
    console.debug(event);
    event.target.src = "https://cdn.browshot.com/static/images/not-found.png";
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.data.listOfImages, event.previousIndex, event.currentIndex);
  }

}
