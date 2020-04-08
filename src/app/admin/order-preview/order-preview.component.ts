import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MailAnswerComponent } from './mail-answer/mail-answer.component';

@Component({
  selector: 'app-order-preview',
  templateUrl: './order-preview.component.html',
  styleUrls: ['./order-preview.component.css']
})
export class OrderPreviewComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialog: MatDialog) { }



  order: any = [];
  ngOnInit() {

    for (let index = 0; this.data < this.data.length; index++) {
      if (this.data[index].value === 1) {
        this.data[index].value === 'DA';
      }

    }


  }

  openAnswerMessageDialog(mail): void {
    const dialogRef = this.dialog.open(MailAnswerComponent, {
      width: 'auto',
      data:mail
    });
  }

  orderColumn: string[] = [
    'site_name', 'site_link',
    'paymentOption', 'photography', 'foreign_language',
    'mail_sender', 'domain', 'hosting', 'animation',
    'number_of_pages', 'contact_form'];

}
