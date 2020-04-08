import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ClientService } from '../service/client.service';
import { OrderTranslate } from '../translate/order';

@Component({
  selector: 'app-order-site',
  templateUrl: './order-site.component.html',
  styleUrls: ['./order-site.component.css']
})
export class OrderSiteComponent implements OnInit {

  @Input()
  checked: boolean;

  isSelected = false;
  listOfLink: any = [];
  listOfPaymentOptions: any = [];
  listOfWebsiteTypes: any = [];
  listOfMaintenacePacket: any = [];


  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  clientInfoForm = new FormGroup({
    name: new FormControl("", Validators.required),
    lastname: new FormControl("", Validators.required),
    mail: new FormControl("", Validators.required),
    telephone: new FormControl("", Validators.required),
    link: new FormControl(""),
  });

  secondOrderForm = new FormGroup({
    id_site_type: new FormControl("", Validators.required),
    site_name: new FormControl("", Validators.required),
    number_of_pages: new FormControl("", Validators.required),
    contact_form: new FormControl(false),
    domain: new FormControl(false),
    hosting: new FormControl(false),
    mail_sender: new FormControl(false),
  });

  thirdOrderForm = new FormGroup({
    id_maintenance_packet: new FormControl("", Validators.required),
    foreign_language: new FormControl(false),
    id_payment_option: new FormControl("", Validators.required),
    animation: new FormControl(false),
    comment: new FormControl("", Validators.required),
    photography: new FormControl(false)
  });

  language = '';
  multiLanguage: Array<any> = [OrderTranslate.languagesWords];
  constructor(private _formBuilder: FormBuilder, private _snackBar: MatSnackBar, public clientServie: ClientService) {

  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.getPaymentOptions();
    this.getWebisteTypes();
    this.getMaintenancePacket();

    this.language = localStorage.getItem('language');

  }
  changeLanguage(changeLanguage) {
    document.getElementById('main').style.display = 'none';
    localStorage.setItem("language", changeLanguage);
    location.reload();
    this.language = changeLanguage;
  }

  addLink() {
    var link = this.clientInfoForm.get('link').value;
    if (link != '') {
      this.listOfLink.push(link);
    } else {
      this.openSnackBar("Link ne moze biti prazan", "POKUSAJ PONOVO");
    }

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  scrollToElement($element): void {
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  
  }

  getPaymentOptions() {
    this.clientServie.getPaymentOptions().subscribe(data => {
      this.listOfPaymentOptions = data;
    })
  }

  getWebisteTypes() {
    this.clientServie.getWebisteTypes().subscribe(data => {
      this.listOfWebsiteTypes = data;
      
    })
  }

  getMaintenancePacket() {
    this.clientServie.getMaintenancePacket().subscribe(data => {
      this.listOfMaintenacePacket = data;
    })
  }


  createOrder() {
    var name = this.clientInfoForm.get('name').value;
    var lastname = this.clientInfoForm.get('lastname').value;
    var mail = this.clientInfoForm.get('mail').value;
    var telephone = this.clientInfoForm.get('telephone').value;
    var site_link = '';
    var id_client = 0;
    var id_site_type = this.secondOrderForm.get('id_site_type').value;
    var site_name = this.secondOrderForm.get('site_name').value;
    var number_of_pages = this.secondOrderForm.get('number_of_pages').value;
    var contact_form = this.secondOrderForm.get('contact_form').value;

    var domain = this.secondOrderForm.get('domain').value;
    var hosting = this.secondOrderForm.get('hosting').value;
    var mail_sender = this.secondOrderForm.get('mail_sender').value;

    var id_maintenance_packet = this.thirdOrderForm.get('id_maintenance_packet').value;

    var id_payment_option = this.thirdOrderForm.get('id_payment_option').value;
    var foreign_language = this.thirdOrderForm.get('foreign_language').value;
    var id_payment_option = this.thirdOrderForm.get('id_payment_option').value;
    var animation = this.thirdOrderForm.get('animation').value;
    var photography = this.thirdOrderForm.get('photography').value;
    var comment = this.thirdOrderForm.get('comment').value;

    var client = { "name": name, "lastname": lastname, "mail": mail, "telephone": telephone }
    this.clientServie.saveClient(client).subscribe(data => {
      id_client = data[0].id_client;

      for (let index = 0; index < this.listOfLink.length; index++) {
        site_link += this.listOfLink[index] + '\n';

      }

      var order = {
        "id_client": id_client,
        "id_site_type": id_site_type,
        "id_payment_option": id_payment_option,
        "contact_form": contact_form,
        "site_name": site_name,
        "site_link": site_link,
        "foreign_language": foreign_language,
        "comment": comment,
        "mail_sender": mail_sender,
        "domain": domain,
        "number_of_pages": number_of_pages,
        "hosting": hosting,
        "animation": animation,
        "photography": photography,
        "id_maintenance_packet": id_maintenance_packet
      };
      this.clientServie.sendOrder(order).subscribe(data => {
        this.openSnackBar(data,"DONE");
      })

    })







  }


}
