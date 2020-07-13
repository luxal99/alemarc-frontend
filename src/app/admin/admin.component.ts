import { Component, OnInit, ViewChild, QueryList, ViewChildren, AfterViewInit } from '@angular/core';
import { MatSidenav, MatDialog, MatSnackBar, MatSlideToggle, MatCheckbox, MatCheckboxChange } from '@angular/material';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent, CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import { AddTechnologyDialogComponent } from './add-technology-dialog/add-technology-dialog.component';
import { AuthService } from '../service/auth.service';
import { TechnologyService } from '../service/technology.service';
import * as firebase from 'firebase'
import { Image } from "../model/Image";
import { AngularFireStorage } from 'angularfire2/storage';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Technology } from '../model/Technology';
import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { Blog } from "../model/Blog";
import { BlogService } from "../service/blog.service";
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @ViewChild('editor', { static: false }) editorComponent: CKEditorComponent;
  public Editor = ClassicEditor;

  @ViewChild('toggle', { static: false }) toggle: MatSlideToggle;

  editorData = '';
  description = '';


  percentage = 0;

  listOfTechnology: Array<Technology> = [];
  selectedTechnology = new Set<Technology>();
  listOfImages: Array<Image> = [];
  fileUploadList: Array<File> = [];

  isReady = 'Nije spremno';

  blogHeadersForm = new FormGroup({
    header: new FormControl("", Validators.required),
    shortText: new FormControl("", Validators.required)
  })

  imageForm = new FormGroup({
    isUploaded: new FormControl("", Validators.required)
  })

  constructor(public dialog: MatDialog, private blogService: BlogService, private afStorage: AngularFireStorage, private technologyService: TechnologyService, private authService: AuthService, private router: Router, public _snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.isValid();
    this.getTechnology();
  }

  addTechnology($event: MatCheckboxChange, technology: Technology) {
    var c = (($event.checked)) ? this.selectedTechnology.add(technology) : this.selectedTechnology.delete(technology);
  }

  addFiles(event) {

    for (let index = 0; index < event.length; index++) {
      if (event[index].size / 1000 > 700) {
        this.openSnackBar("Prevelik fajl", "DONE");
      } else {

        const element = event[index];
        this.fileUploadList.push(element);
      }
    }
  }

  uploadFiles() {

    for (const file of this.fileUploadList) {
      this.afStorage.upload(file.name, file).percentageChanges().subscribe(data => {
        this.percentage = data
      });
    }

    setTimeout(() => {

      for (const fileName of this.fileUploadList) {
        const downloadUrl = this.afStorage.ref(fileName.name).getDownloadURL().subscribe(data => {
          var ti = new Image()
          ti.fileName = fileName.name;
          ti.url = data;
          this.listOfImages.push(ti);

          this.toggle.writeValue(true);
          this.isReady = 'Spremno je';
          document.getElementById('toggle').style.color = "#4BB543";

        });
      }
    }, 1500 * this.fileUploadList.length)

  }





  openAddTechDialog(): void {
    const dialogRef = this.dialog.open(AddTechnologyDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
     this.getTechnology();
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

  isValid() {
    if (!this.authService.isValid(localStorage.getItem("token"))) this.router.navigate(['/'])
  }

  getTechnology() {
    this.technologyService.getAll().subscribe(data => {
      this.listOfTechnology = JSON.parse(JSON.stringify(data)) as Array<Technology>;

    }, error => {

    })
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }




  save() {

    let blog = new Blog();


    blog.header = this.blogHeadersForm.get("header").value;
    blog.shortText = this.blogHeadersForm.get("shortText").value;
    blog.listOfImages = this.listOfImages;
    blog.listOfTechnologies = Array.from(this.selectedTechnology)
    blog.longText = this.editorComponent.editorInstance.getData();

    this.blogService.save(blog).subscribe(data => {
    }, error => {
      this.router.navigate(['/err'])
    })



  }


}




/** Builds and returns a new User. */

