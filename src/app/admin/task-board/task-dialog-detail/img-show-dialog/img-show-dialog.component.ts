import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-img-show-dialog',
  templateUrl: './img-show-dialog.component.html',
  styleUrls: ['./img-show-dialog.component.css']
})
export class ImgShowDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialog:MatDialog) { }

  ngOnInit() {
    console.log(this.data);
    
  }


  
}
