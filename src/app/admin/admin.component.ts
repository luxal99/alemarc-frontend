import { Component, OnInit, ViewChild, QueryList, ViewChildren, AfterViewInit } from '@angular/core';
import { MatSidenav, MatDialog, MatSnackBar } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MessagePreviewDialogComponent } from './message-preview-dialog/message-preview-dialog.component';
import * as $ from 'jquery';
import { AdminService } from '../service/admin.service';
import { OrderPreviewComponent } from './order-preview/order-preview.component';
import { Router } from '@angular/router';
import { ChangeLoginComponent } from './change-login/change-login.component';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent, CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import { BlogDialogComponent } from './blog-dialog/blog-dialog.component';

export interface Mail {
  id: number;
  id_client: Client;
  subject: string;
  message: string;
}

export class Client {

}

export interface Order {
  id: number;
  name: string;
  lastname: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, AfterViewInit {

  listOfBlogs: any = [];

  mailColumn: string[] = ['id', 'name', 'lastname', 'subject', 'option'];
  orderColumn: string[] = ['name', 'lastname', 'mail', 'telephone', 'option'];

  dataSource: any = [];
  orderSource: MatTableDataSource<Order>
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();


  listOfMessages: any = [];
  listOfOrder: any = [];
  listOfMail: any = [];

  testArray: Array<any> = [
    { id: 1, title: "Naslov 1" },
    { id: 2, title: "Naslov 2" },
    { id: 3, title: "Naslov 3" }
  ]


  constructor(public dialog: MatDialog, public adminService: AdminService, private router: Router, public _snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.getAllMessages();
    this.getAllOrders();
    this.removeToken();
    this.getBlogs();

  }

  ngAfterViewInit() {

  }

  showOrder() {
    document.getElementById('mail-div').style.display = 'none';
    document.getElementById('order-div').style.display = 'block';
    document.getElementById('order-div').toggleAttribute('slow');
    document.getElementById('mail-div').style.transition = 'opacity 1s ease-out';
  }

  showMail() {
    document.getElementById('mail-div').style.display = 'block';
    document.getElementById('order-div').style.display = 'none';
    document.getElementById('mail-div').style.transition = 'opacity 1s ease-out';
  }


  openMessage(mail): void {
    const dialogRef = this.dialog.open(MessagePreviewDialogComponent, {
      width: 'auto',
      position: { left: '0' },
      height: '100vh',
      data: {
        mail: mail
      }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
  getAllMessages() {
    const token = localStorage.getItem("token");

    this.adminService.getAllMessages(token).subscribe(data => {
      this.dataSource = data;


    })
  }
  deleteMail(id_mail) {
    this.adminService.deleteMail(id_mail).subscribe(data => {
      this.getAllMessages();

    })
  }

  getAllOrders() {
    this.adminService.getAllOrders().subscribe(data => {
      this.listOfOrder = data;


    })
  }

  getBlogs() {
    this.adminService.getBlogs().subscribe(data => {
      this.listOfBlogs = data;
      console.log(data);
      
    })
  }

  deleteOrder(id_site_order) {
    this.adminService.deleteOrder(id_site_order).subscribe(data => {
      this.getAllOrders();

    })
  }

  openOrderPreview(order): void {
    const dialogRef = this.dialog.open(OrderPreviewComponent, {
      width: 'auto',
      position: { left: '0' },
      height: '100vh',
      data: order
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  logout() {
    var isAuthenticated = { "isAuthenticated": false };

    this.adminService.logout(isAuthenticated).subscribe(data => {

    })
    this.router.navigate(['login']);
    localStorage.removeItem("token");
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }


  openChangeLoginDialog(): void {
    const dialogRef = this.dialog.open(ChangeLoginComponent, {
      width: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (localStorage.getItem('isPasswordChanged') === 'true') {
        this.router.navigate(['/login']);
      }
    });


  }


  openBlogDialog(): void {
    const dialogRef = this.dialog.open(BlogDialogComponent, {
      width: '1000px',
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (localStorage.getItem('isPasswordChanged') === 'true') {
        this.router.navigate(['/login']);
      }
    });


  }


  removeToken() {
    setTimeout(() => {
      localStorage.removeItem('token')
    }, 1000 * 120);
  }


}




/** Builds and returns a new User. */

