import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-blog-preview-dialog',
  templateUrl: './blog-preview-dialog.component.html',
  styleUrls: ['./blog-preview-dialog.component.css']
})
export class BlogPreviewDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  listOfImages :any=[];
  ngOnInit() {
    this.listOfImages = this.data.images
    console.log(this.data);
    
  }



}
