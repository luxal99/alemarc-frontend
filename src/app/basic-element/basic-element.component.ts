import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-basic-element',
  templateUrl: './basic-element.component.html',
  styleUrls: ['./basic-element.component.css']
})
export class BasicElementComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
  }

  openSlideMenu(){
    document.getElementById('menu').style.width = '250px';
    document.getElementById('content').style.marginLeft = '250px';
  }
}
