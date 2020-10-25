import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatCheckboxChange, MAT_DIALOG_DATA } from '@angular/material';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import { Blog } from 'src/app/model/Blog';
import { BlogService } from 'src/app/service/blog.service';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Technology } from 'src/app/model/Technology';
import { TechnologyDTO } from 'src/app/model/TechnologyDTO';
import { TechnologyService } from 'src/app/service/technology.service';

@Component({
  selector: 'app-edit-blog-dialog',
  templateUrl: './edit-blog-dialog.component.html',
  styleUrls: ['./edit-blog-dialog.component.css']
})
export class EditBlogDialogComponent implements OnInit {

  @ViewChild('editor', { static: false }) editorComponent: CKEditorComponent;
  public Editor = ClassicEditor;

  selectedTechnology: Array<TechnologyDTO> = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: Blog, private blogService: BlogService,
    private technologyService: TechnologyService) { }

  headerForm = new FormGroup({
    header: new FormControl(this.data.header),
    shortText: new FormControl(this.data.shortText)
  })

  ngOnInit() {
    this.getTechnologies();
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
      console.log(resp);

    })
  }



}
