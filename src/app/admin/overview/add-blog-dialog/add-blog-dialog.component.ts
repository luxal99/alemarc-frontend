import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {CKEditorComponent} from '@ckeditor/ckeditor5-angular';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {Technology} from '../../../model/Technology';
import {Image} from '../../../model/Image';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {BlogService} from '../../../service/blog.service';
import {TechnologyService} from '../../../service/technology.service';
import {AuthService} from '../../../service/auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AngularFireStorage} from '@angular/fire/storage';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {AddTechnologyDialogComponent} from '../../add-technology-dialog/add-technology-dialog.component';
import {Blog} from '../../../model/Blog';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-blog-dialog',
  templateUrl: './add-blog-dialog.component.html',
  styleUrls: ['./add-blog-dialog.component.css']
})
export class AddBlogDialogComponent implements OnInit {

  @ViewChild('editor') editorComponent: CKEditorComponent;
  public Editor = ClassicEditor;

  @ViewChild('toggle') toggle: MatSlideToggle;

  @ViewChild('target', {read: ViewContainerRef}) entry: ViewContainerRef;

  editorData = '';
  description = '';


  percentage = 0;

  listOfTechnology: Array<Technology> = [];
  selectedTechnology = new Set<Technology>();
  listOfImages: Array<Image> = [];
  fileUploadList: Array<File> = [];

  isReady = 'Nije spremno';

  blogHeadersForm = new FormGroup({
    header: new FormControl('', Validators.required),
    shortText: new FormControl('', Validators.required)
  });

  imageForm = new FormGroup({
    isUploaded: new FormControl('', Validators.required)
  });

  constructor(private dialog: MatDialog, private blogService: BlogService, private technologyService: TechnologyService,
              private authService: AuthService, private router: Router, public snackBar: MatSnackBar,
              private cvRef: ViewContainerRef, private resolver: ComponentFactoryResolver,
              private afStorage: AngularFireStorage) {
  }

  ngOnInit() {
    this.getTechnology();
  }

  addTechnology($event: MatCheckboxChange, technology: Technology) {
    const c = (($event.checked)) ? this.selectedTechnology.add(technology) : this.selectedTechnology.delete(technology);
  }

  addFiles(event) {

    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.fileUploadList.push(element);

    }
  }


  changeToggle() {
    this.toggle.writeValue(true);
    this.isReady = 'Spremno je';
    document.getElementById('toggle').style.color = '#4BB543';
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

  getTechnology() {
    this.technologyService.getAll().subscribe(data => {
      this.listOfTechnology = JSON.parse(JSON.stringify(data)) as Array<Technology>;
    }, error => {
    });
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  save() {

    const blog = new Blog();
    blog.header = this.blogHeadersForm.get('header').value;
    blog.shortText = this.blogHeadersForm.get('shortText').value;
    blog.listOfImages = this.listOfImages;
    blog.listOfTechnologies = Array.from(this.selectedTechnology);
    blog.longText = this.editorComponent.editorInstance.getData();

    this.blogService.save(blog).subscribe(data => {
    }, error => {
      this.router.navigate(['/err']);
    });
  }

}
