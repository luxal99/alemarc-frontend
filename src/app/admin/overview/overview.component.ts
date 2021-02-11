import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Blog } from 'src/app/model/Blog';
import { BlogService } from 'src/app/service/blog.service';
import { SwiperOptions } from 'swiper';
import { EditBlogDialogComponent } from './edit-blog-dialog/edit-blog-dialog.component';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  listOfBlogs: Array<Blog> = [];
  constructor(private blogService: BlogService, private dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    this.getBlogs();
  }

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
  }

  getBlogs() {
    this.blogService.getAll().subscribe(resp => {
      this.listOfBlogs = resp as Array<Blog>;
    })
  }

  openEditBlogDialog(blog) {
    const dialogRef = this.dialog.open(EditBlogDialogComponent, {
      minWidth: '40%',
      position: { right: '0' },
      height: '100vh',
      data:blog

    });

    dialogRef.afterClosed().subscribe(result => {
      this.getBlogs();
    });
  }

}
