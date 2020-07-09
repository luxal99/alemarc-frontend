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
import { AuthService } from '../service/auth.service';

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


  constructor(public dialog: MatDialog,private authService:AuthService, private router: Router, public _snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.isValid();
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

  isValid(){
    if(!this.authService.isValid(localStorage.getItem("token"))) this.router.navigate(['/'])
  }




}




/** Builds and returns a new User. */

