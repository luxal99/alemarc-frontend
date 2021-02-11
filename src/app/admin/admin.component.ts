import * as $ from 'jquery';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { AfterViewInit, Component, ComponentFactoryResolver, OnInit, QueryList, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { CKEditorComponent, ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AddTechnologyDialogComponent } from './add-technology-dialog/add-technology-dialog.component';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../service/auth.service';
import { Blog } from "../model/Blog";
import { BlogService } from "../service/blog.service";
import { Image } from "../model/Image";
import { Router } from '@angular/router';
import { Technology } from '../model/Technology';
import { TechnologyService } from '../service/technology.service';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @ViewChild('editor') editorComponent: CKEditorComponent;
  public Editor = ClassicEditor;

  @ViewChild('toggle') toggle: MatSlideToggle;

  @ViewChild('target', { read: ViewContainerRef }) entry: ViewContainerRef;

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

  constructor(public dialog: MatDialog, private blogService: BlogService, private technologyService: TechnologyService,
    private authService: AuthService, private router: Router, public _snackBar: MatSnackBar,
    private cvRef: ViewContainerRef, private resolver: ComponentFactoryResolver,
    private afStorage: AngularFireStorage) {
  }

  ngOnInit() {
    this.isValid();
    this.getTechnology();
  }
  ngAfterViewInit(): void {
    this.loadOverviewComponent()
  }

  async loadOverviewComponent() {
    this.entry.clear();
    const { OverviewComponent } = await import('./overview/overview.component');
    const factory = this.resolver.resolveComponentFactory(OverviewComponent)
    this.entry.createComponent(factory);
  }

  addTechnology($event: MatCheckboxChange, technology: Technology) {
    var c = (($event.checked)) ? this.selectedTechnology.add(technology) : this.selectedTechnology.delete(technology);
  }

  addFiles(event) {

    for (let index = 0; index < event.length; index++) {
        const element = event[index];
        this.fileUploadList.push(element);
      
    }
  }


  changeToggle() {
    this.toggle.writeValue(true);
    this.isReady = 'Spremno je';
    document.getElementById('toggle').style.color = "#4BB543";
  }

  async getFiles() {

    for (const file of this.fileUploadList) {
      this.afStorage.upload(file.name, file)
        .then(() => {
          const downloadUrl = this.afStorage.ref(file.name).getDownloadURL().subscribe(data => {

            this.listOfImages.push(new Image(file.name, data));
            this.changeToggle();

          });
        });
    }

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

