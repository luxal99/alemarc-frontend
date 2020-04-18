import { Component, OnInit, ViewChild } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent, CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import { AdminService } from 'src/app/service/admin.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AngularFireStorage } from 'angularfire2/storage';


@Component({
  selector: 'app-blog-dialog',
  templateUrl: './blog-dialog.component.html',
  styleUrls: ['./blog-dialog.component.css']
})
export class BlogDialogComponent implements OnInit {

  // List of technique which use in some project
  listOfTechnologies: any = [];

  // One of the select images
  image_url;


  /**
   * List of images path destination
   * This use to send to MongoDB and later
   * bind to frontend
   */
  images: Array<any> = [];

  constructor(public adminService: AdminService, public _snackBar: MatSnackBar,private afStorage: AngularFireStorage) { }

  ngOnInit() {

  }

  // Blog from
  blogHeader = new FormGroup({
    header: new FormControl(),
    technologie: new FormControl()
  })

  // Html editor SRB
  @ViewChild('editorSn', { static: false }) editorComponentSr: CKEditorComponent;

  // Html editor EN
  @ViewChild('editorEn', { static: false }) editorComponentEn: CKEditorComponent;

  public Editor = ClassicEditor;

  // Multiple file selector
  @ViewChild('file', { static: false }) file
  public files: Set<File> = new Set()

  // Content of html editor
  text_en = '';
  text_sr = '';
  editorData = '';


  fileName;
  listOfFileNames: any = []


  upload(event: any) {
    for (const file of event.target.files) {
      const size = Math.round(file.size / 1000)

      if (size > 1700) {
        this.openSnackBar(`File is too large: ${file.name}`, "DONE")
      } else {

        this.afStorage.upload(file.name, file);

        this.fileName = file.name
        this.listOfFileNames.push(this.fileName)
      }

    }
  }



  uploadToFirebase() {
    console.log(this.listOfFileNames.length);

    setTimeout(() => {
      for (const fileName of this.listOfFileNames) {
        const downloadUrl = this.afStorage.ref(fileName).getDownloadURL().subscribe(data => {
          console.log('Secon func', data);
          var attachment = { url: data }
          this.images.push(data);

        });

      }

    }, 800)



  }


  // Save blog service
  saveBlog() {
    var header = this.blogHeader.get('header').value;

    this.text_en = this.editorComponentEn.editorInstance.getData();
    this.text_sr = this.editorComponentSr.editorInstance.getData();


    // Object which send data to NODE JS
    var blog = {
      header: header,
      images: this.images,
      text_sr: this.text_sr,
      text_en: this.text_en,
      cover: this.images[0],
      technologies: this.listOfTechnologies
    }
    this.adminService.saveBlog(blog).subscribe(data => {
    })
  }

  addTechnologie() {
    var technologie = this.blogHeader.get('technologie').value;

    this.listOfTechnologies.push(technologie);
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }







}
