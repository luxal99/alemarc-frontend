import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Blog} from 'src/app/model/Blog';
import {BlogService} from 'src/app/service/blog.service';
import {SwiperOptions} from 'swiper';
import {EditBlogDialogComponent} from './edit-blog-dialog/edit-blog-dialog.component';
import {AddBlogDialogComponent} from './add-blog-dialog/add-blog-dialog.component';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  listOfBlogs: Array<Blog> = [];

  config: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 200,
    slidesPerGroup: 3,
    loop: true,
    loopFillGroupWithBlank: false,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  };

  searchText = '';
  searchForm = new FormGroup({
    search: new FormControl()
  });

  constructor(private blogService: BlogService, private dialog: MatDialog) {
  }

  async ngOnInit(): Promise<void> {
    this.getBlogs();
  }

  getBlogs() {
    this.blogService.getAll().subscribe(resp => {
      this.listOfBlogs = resp as Array<Blog>;
    });
  }

  openEditBlogDialog(blog) {
    const dialogRef = this.dialog.open(EditBlogDialogComponent, {
      minWidth: '40%',
      position: {right: '0'},
      height: '100vh',
      data: blog

    });

    dialogRef.afterClosed().subscribe(result => {
      this.getBlogs();
    });
  }

  openAddBlogDialog() {
    this.dialog.open(AddBlogDialogComponent, {}).afterClosed().subscribe(() => {
      this.getBlogs();
    });
  }

}
