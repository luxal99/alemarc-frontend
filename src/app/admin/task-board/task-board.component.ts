import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskDialogDetailComponent } from './task-dialog-detail/task-dialog-detail.component';
import { MatDialog, MatDrawer } from '@angular/material';
import { AdminService } from 'src/app/service/admin.service';
import { CreateBoardDialogComponent } from './create-board-dialog/create-board-dialog.component';
import { AddNewTaskDialogComponent } from './add-new-task-dialog/add-new-task-dialog.component';
import { FormGroup, FormControl } from '@angular/forms';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ArchiveDialogComponent } from './archive-dialog/archive-dialog.component';
@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css']
})
export class TaskBoardComponent implements OnInit {

  // Sidenav menu
  @ViewChild('drawer', { static: false }) drawer: MatDrawer;


  // Barchart & PieChart
  barChartLegend = true;
  barChartPlugins = [];
   barChartOptions: ChartOptions = {
    responsive: true,
  };

  // Only bar chart
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';

  // Only pie chart
  barChartLabelsPie: Label[] = [];
  barChartTypePie: ChartType = 'pie';

  // BarChart Data
  barChartData: ChartDataSets[] = [{ data: [],backgroundColor:['#EC6B56',"#FFC154","#47B39C"]}];

  // PieChart data
  barChartDataPerBoard: ChartDataSets[] = [{ data: [],backgroundColor:['#EC6B56',"#FFC154","#47B39C"]}];

  constructor(public dialog: MatDialog, public adminService: AdminService) { }

  theme = ''

  // PieChart data list
  listOfTaskPerBoard:any=[];
  // List of all board
  listOfBoard: any = [];
  // List of tasks for board
  listOfTasks: any = [];
  // BarChart data
  taskGraphList:any=[];

  // Id of current board
  id_board;

  themeForm = new FormGroup({
    theme: new FormControl()
  })

  ngOnInit() {
    this.getBoards();
    this.saveTheme();
  }

  openMenu(){
    this.drawer.toggle();
    this.getTaskPerBoard();
    this.getTaskAnalyse();
  }

  // Default theme is light
  saveTheme(){
    if (localStorage.getItem('theme') === null) {
      localStorage.setItem('theme', 'light');
      this.theme = localStorage.getItem('theme');
    } else {
      this.theme = localStorage.getItem('theme');
    }

    if(localStorage.getItem('theme') === 'dark'){
      this.themeForm.get('theme').setValue(true)
    }
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

  /**
   * Send id_task_board 
   * On dialog init service find all tasks for that board
   * where visible = 0
   * @param tab 
   */
  openArchiveDialog(tab): void {
    const dialogRef = this.dialog.open(ArchiveDialogComponent, {
      minWidth: '100vh',
      position: { left: '0' },
      minHeight:'100vh',
      data: tab
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getTasks();
    });
  }

  /**
   * Send one task
   * And bind data of task into dialog content
   * @param task 
   */
  openTaskDetail(task): void {
    const dialogRef = this.dialog.open(TaskDialogDetailComponent, {
      minWidth: '90vh',
      minHeight: '20vh',
      maxHeight: '90vh',
      data: task
    });

    // Refresh taskboard 
    dialogRef.afterClosed().subscribe(result => {
      this.getTasks();
    });
  }

  // Dialog for create board
  openCreateBoardDialog(): void {
    const dialogRef = this.dialog.open(CreateBoardDialogComponent, {
      width: 'auto',
    });

    // Refresh board
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

  /**
   * Service which count all tasks per category
   * for all boards
   *  1.To DO
   *  2.In progress
   *  3. Done
   *  
   * 
   */
  getTaskAnalyse(){

    this.barChartData[0].data = [];
    this.taskGraphList=[];
    this.barChartLabels = [];

    var empty =0;
    this.adminService.getTaskAnalyse().subscribe(data=>{
      this.taskGraphList = data;
      this.taskGraphList.forEach(element => {
        this.barChartLabels.push(element.title);
       this.barChartData[0].data.push(element.num_of_tasks)
      
      });

      this.barChartData[0].data.push(empty)
      
    })
  }



  /**
   * Service which count how many
   * tasks we have per board
   */
  getTaskPerBoard(){

    this.barChartDataPerBoard[0].data = [];
    this.listOfTaskPerBoard=[];
    this.barChartLabelsPie = [];

    var empty =0;
    this.adminService.getTaskPerBoard().subscribe(data=>{
      this.listOfTaskPerBoard = data;

      this.listOfTaskPerBoard.forEach(element => {
        console.log(element);
        
        this.barChartLabelsPie.push(element.title);
       this.barChartDataPerBoard[0].data.push(element.num_of_tasks)
      
      });

      this.barChartDataPerBoard[0].data.push(empty)
      
    })
  }

  // Funcion to get information of current board
  getBoard($event) {
    this.id_board = this.listOfBoard[$event.index].id_task_board
  }

  setTheme() {

    if (this.themeForm.get('theme').value) {
      this.theme = 'dark'
      localStorage.setItem('theme', 'dark')
    } else {
      this.theme = 'light'
      localStorage.setItem('theme', 'light')
    }
  }

}
