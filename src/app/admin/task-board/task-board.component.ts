import { Component, OnInit } from '@angular/core';
import { TaskDialogDetailComponent } from './task-dialog-detail/task-dialog-detail.component';
import { MatDialog } from '@angular/material';
import { AdminService } from 'src/app/service/admin.service';
import { CreateBoardDialogComponent } from './create-board-dialog/create-board-dialog.component';
import { AddNewTaskDialogComponent } from './add-new-task-dialog/add-new-task-dialog.component';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css']
})
export class TaskBoardComponent implements OnInit {

  constructor(public dialog: MatDialog, public adminService: AdminService) { }

  theme = 'light'
  
  listOfBoard: any = [];
  listOfTasks: any = [];

  // Id of current board
  id_board;

  themeForm=new FormGroup({
    theme:new FormControl()
  })

  ngOnInit() {
    this.setTheme();
    this.getBoards();
  }


  // Dialog for create task
  openNewTaskDialog(task): void {
    const dialogRef = this.dialog.open(AddNewTaskDialogComponent, {
      minWidth: '100vh',
      data: task
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getTasks();
    });
  }

  // Overview task
  openTaskDetail(task): void {
    const dialogRef = this.dialog.open(TaskDialogDetailComponent, {
      minWidth: '90vh',
      minHeight: '20vh',
      maxHeight: '90vh',
      data: task
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getTasks();
    });
  }

  // Dialog for create board
  openCreateBoardDialog(): void {
    const dialogRef = this.dialog.open(CreateBoardDialogComponent, {
      width: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getBoards();
    });
  }


  // Service for get all boards
  getBoards() {
    this.adminService.getBoard().subscribe(data => {
      this.listOfBoard = data;
    })
  }

  /**
   * This service use for get all tasks of current board
   * We forward @param id_board and get list of tasks
   * 
   * This use to refresh fine on update od add
   * 
   */
  getTasks() {
    this.adminService.getTaskList(this.id_board).subscribe(data => {
      this.listOfTasks = data;

      this.listOfBoard.forEach(element => {
        if (element.id_task_board === this.id_board) {
          element.cardList = data
        }
      });

    })
  }

  // Funcion to get information of current board
  getBoard($event) {
    this.id_board = this.listOfBoard[$event.index].id_task_board
  }

  // darkTheme(){
  //   document.getElementById('content').style.backgroundColor='#121212';
  //   document.getElementById('card').style.backgroundColor='#131313';
  //   document.getElementById('card').style.color='#eee';
  //   document.getElementById('card').style.boxShadow=' 10px 31px 8px -26px rgba(0, 0, 0, 0.75)';
  //   document.getElementById('card').style.webkitBoxShadow='10px 31px 8px -26px rgba(0, 0, 0, 0.75)';
  //   document.getElementById('card-content').style.boxShadow=' 3px 10px 24px -4px rgba(0, 0, 0, 0.75)';
  //   document.getElementById('card-content').style.webkitBoxShadow=' 3px 10px 24px -4px rgba(0, 0, 0, 0.75)';
  //   document.getElementById('card-content').style.backgroundColor='#222';
  //   document.getElementById('card-content').style.color='#fff';
  //   document.getElementById('card-header').style.backgroundColor='#080808';
  //   document.getElementById('card-header').style.color='#fff !important';
  // }

  // lightTheme(){
  //   document.getElementById('content').style.backgroundColor='#eee';
  //   document.getElementById('card').style.backgroundColor='transparent';
  //   document.getElementById('card').style.boxShadow='none';
  //   document.getElementById('card-content').style.backgroundColor='transparent';
  //   document.getElementById('card-content').style.color='#121212';
  //   document.getElementById('card-content').style.color='#121212';
  //   document.getElementById('card-header').style.backgroundColor='transparent';
  // }

  
  setTheme(){
    
    if (this.themeForm.get('theme').value) {
      this.theme = 'dark'
    }else{
      this.theme = 'light'
    }
  }

}
