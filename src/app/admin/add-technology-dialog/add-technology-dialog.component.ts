import { Component, OnInit } from '@angular/core';
import { TechnologyService } from "../../service/technology.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Technology } from 'src/app/model/Technology';

@Component({
  selector: 'app-add-technology-dialog',
  templateUrl: './add-technology-dialog.component.html',
  styleUrls: ['./add-technology-dialog.component.css']
})
export class AddTechnologyDialogComponent implements OnInit {

  constructor(private technologyService: TechnologyService) { }

  techForm = new FormGroup({
    title: new FormControl("", Validators.required)
  })
  ngOnInit() {
  }

  save() {
    this.technologyService.save(new Technology(this.techForm.get("title").value)).subscribe(data => {
      console.log(data);

    }, error => {
        
    })
  }

}
