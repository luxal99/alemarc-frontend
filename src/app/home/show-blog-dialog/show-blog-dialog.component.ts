import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-show-blog-dialog',
  templateUrl: './show-blog-dialog.component.html',
  styleUrls: ['./show-blog-dialog.component.css']
})
export class ShowBlogDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data);
    
  }

}
