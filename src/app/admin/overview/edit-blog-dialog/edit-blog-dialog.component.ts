import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import { Blog } from 'src/app/model/Blog';
import { BlogService } from 'src/app/service/blog.service';
import { Image } from "src/app/model/Image";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Technology } from 'src/app/model/Technology';
import { TechnologyDTO } from 'src/app/model/TechnologyDTO';
import { TechnologyService } from 'src/app/service/technology.service';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-edit-blog-dialog',
  templateUrl: './edit-blog-dialog.component.html',
  styleUrls: ['./edit-blog-dialog.component.css']
})
export class EditBlogDialogComponent implements OnInit {

  @ViewChild('editor') editorComponent: CKEditorComponent;
  public Editor = ClassicEditor;


  @ViewChild('toggle') toggle: MatSlideToggle;

  listOfImages: Array<Image> = [];
  fileUploadList: Array<File> = [];


  isReady = 'Nije spremno';

  percentage = 0;


  imageForm = new FormGroup({
    isUploaded: new FormControl("", Validators.required)
  })

  selectedTechnology: Array<TechnologyDTO> = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: Blog,private afStorage: AngularFireStorage, private blogService: BlogService,
    private technologyService: TechnologyService,public _snackBar: MatSnackBar) { }

  headerForm = new FormGroup({
    header: new FormControl(this.data.header),
    shortText: new FormControl(this.data.shortText)
  })

  ngOnInit() {
    this.getTechnologies();
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

            this.data.listOfImages.push(new Image(file.name, data));
            this.changeToggle();

          });
        });
    }

  }

  getTechnologies() {
    this.technologyService.getAll().subscribe((resp: Array<Technology>) => {
      resp.forEach(tech => {

        let techDTO = new TechnologyDTO(tech)
        if (this.data.listOfTechnologies.findIndex(x => x.id === tech.id) !== -1) {
          techDTO.checked = true;
          this.selectedTechnology.push(techDTO)

        } else {
          this.selectedTechnology.push(techDTO);
        }
      })
    })
  }

  errorHandler(event) {
    console.debug(event);
    event.target.src = "https://cdn.browshot.com/static/images/not-found.png";
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.data.listOfImages, event.previousIndex, event.currentIndex);
  }

  addAccessories($event: MatCheckboxChange, accessories: Technology) {

    var index = this.data.listOfTechnologies.indexOf(accessories)

    if ($event.checked && index === -1) {
      this.data.listOfTechnologies.push(accessories)
    } else {
      this.data.listOfTechnologies.splice(index, 1)
    }
  }


  deletePhoto(photo) {
    let index = this.data.listOfImages.indexOf(photo);
    this.data.listOfImages.splice(index, 1)
  }
  update() {

    this.data.header = this.headerForm.get("header").value;
    this.data.shortText = this.headerForm.get("shortText").value;

    this.data.longText = this.editorComponent.editorInstance.getData();
    

    this.blogService.update(this.data).subscribe(resp => {
 
    },err =>{
      console.log('err');
      
    })
  }



  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
