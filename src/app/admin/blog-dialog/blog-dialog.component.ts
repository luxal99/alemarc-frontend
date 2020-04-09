import { Component, OnInit, ViewChild } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent, CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import { AdminService } from 'src/app/service/admin.service';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-blog-dialog',
  templateUrl: './blog-dialog.component.html',
  styleUrls: ['./blog-dialog.component.css']
})
export class BlogDialogComponent implements OnInit {


  // One of the select images
  image_url;


  /**
   * List of images path destination
   * This use to send to MongoDB and later
   * bind to frontend
   */
  images: Array<any> = [];

  constructor(public adminService: AdminService) { }

  ngOnInit() {

  }
  blogHeader = new FormGroup({
    header: new FormControl()
  })

  // Html editor
  @ViewChild('editorSn', { static: false }) editorComponentSr: CKEditorComponent;

  @ViewChild('editorEn', { static: false }) editorComponentEn: CKEditorComponent;

  public Editor = ClassicEditor;

  // Multiple file selector
  @ViewChild('file', { static: false }) file
  public files: Set<File> = new Set()

  // Content of html editor
  text_en = '';
  text_sr = '';
  editorData = '';


  // Add images to list for upload
  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);
        this.images.push('assets/img/blog/' + files[key].name)


      }
    }
  }

  // Save blog service
  saveBlog() {
    var header = this.blogHeader.get('header').value;

    this.text_en = this.editorComponentEn.editorInstance.getData();
    this.text_sr = this.editorComponentSr.editorInstance.getData();

    this.files.forEach(element => {
      const formData: FormData = new FormData();
      formData.append('image_url', element)
      this.adminService.uploadPhoto(formData).subscribe(data => {
      })
    });
    var blog = {
      header: header,
      images: this.images,
      text_sr: this.text_sr,
      text_en:this.text_en,
      cover:this.images[0]
    }
    this.adminService.saveBlog(blog).subscribe(data => {
    })
  }


  


}
