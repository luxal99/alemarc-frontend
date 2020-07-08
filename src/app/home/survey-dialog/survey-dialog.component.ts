import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/service/client.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-survey-dialog',
  templateUrl: './survey-dialog.component.html',
  styleUrls: ['./survey-dialog.component.css']
})
export class SurveyDialogComponent implements OnInit {

  constructor(public service: ClientService) { }

  ngOnInit() {
  }

  surveyForm = new FormGroup({
    full_name: new FormControl("", Validators.required),
    contact: new FormControl("", Validators.required),
    surveyAnswer: new FormControl("", Validators.required)
  })

  saveSurvey() {
    var client = { "full_name": this.surveyForm.get("full_name").value, "contact": this.surveyForm.get("contact").value };
    var survey = { "client": client, "surveyAnswer": this.surveyForm.get("surveyAnswer").value }

    this.service.sendSurvey(survey).subscribe(data => {
        
    })
  }

}
