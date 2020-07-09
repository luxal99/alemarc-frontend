import { Component, OnInit, ViewChild, QueryList, ViewChildren, AfterViewInit } from '@angular/core';
import { MatSidenav, MatDialog, MatSnackBar } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent, CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import { AddTechnologyDialogComponent } from './add-technology-dialog/add-technology-dialog.component';

export interface Mail {
  id: number;
  id_client: Client;
  subject: string;
  message: string;
}

export class Client {

}

export interface Order {
  id: number;
  name: string;
  lastname: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @ViewChild('editor', { static: false }) editorComponent: CKEditorComponent;
  public Editor = ClassicEditor;

  editorData = '';
  description = '';


  listOfMessages: any = [];
  listOfOrder: any = [];
  listOfMail: any = [];

  constructor(public dialog: MatDialog, private router: Router, public _snackBar: MatSnackBar) {
  }

  ngOnInit() {

  }


  openAddTechDialog(): void {
    const dialogRef = this.dialog.open(AddTechnologyDialogComponent, {
      width: '250px'
    });
  }


  editDate() {
    const x = document.getElementById("blog");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }




}




/** Builds and returns a new User. */

