import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import Swiper,{SwiperOptions} from 'swiper'
import { HomeTranslate } from 'src/app/translate/home';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {

  blog: Object = '';
  constructor(private route: ActivatedRoute, public adminService: AdminService) { }

  language=''
  multiLanguage: Array<any> = [HomeTranslate.languagesWords];

  ngOnInit() {
    console.log(this.route.params);

    this.route.params.subscribe(param => {
      this.adminService.findBlogById(param.id).subscribe(data => {
        this.blog = data;
        console.log(this.blog);
        
      })

    })

    this.language= localStorage.getItem('language');
    this.swiper()
  }

  config: SwiperOptions = {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
  };

  swiper(){
    var swiper = new Swiper('.swiper-container', {
      pagination: {
        el: '.swiper-pagination',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

  }

}
