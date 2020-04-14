import { Component, OnInit, Inject } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-archive-dialog',
  templateUrl: './archive-dialog.component.html',
  styleUrls: ['./archive-dialog.component.css']
})
export class ArchiveDialogComponent implements OnInit {

  theme;
  listOfArchivedTask:any=[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public adminService:AdminService) { }

  ngOnInit() {
    this.getArchived();
    this.setTheme();
  }

  setTheme(){
    this.theme = localStorage.getItem('theme');
  }

  getArchived(){
    this.adminService.getArchivedTask(this.data).subscribe(data=>{
      this.listOfArchivedTask = data;
      console.log(this.listOfArchivedTask);
      
    })
  }

}
