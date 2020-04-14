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

  /**
   * List of archived tasks
   * 
   * If visible=0 
   */
  listOfArchivedTask: any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public adminService: AdminService) { }


  ngOnInit() {
    this.getArchived();
    this.setTheme();
  }

  setTheme() {
    this.theme = localStorage.getItem('theme');
  }

  // Service return archived tasks
  getArchived() {
    this.adminService.getArchivedTask(this.data).subscribe(data => {
      this.listOfArchivedTask = data;
      console.log(this.listOfArchivedTask);

    })
  }

  // Set visible to true and update task
  unArchiveTask(task) {
    task.visible = true;
    task.id_card_status = task.idCardStatusIdCardStatus


    this.adminService.updateTask(task).subscribe(data => {
      this.getArchived();
    })
  }


  // Not used yet
  unArchiveAll(){
    this.adminService.unArchiveAll(this.listOfArchivedTask).subscribe(data=>{
      this.getArchived();
      
    })
  
  }
}
