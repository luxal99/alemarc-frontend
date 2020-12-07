import * as AOS from 'aos'

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'alemarc-frontend';

  ngOnInit(): void {
    AOS.init({
      once: true
    });
  }
}
