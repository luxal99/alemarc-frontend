import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css']
})
export class TaskBoardComponent implements OnInit {

  constructor() { }

  listOfBoard:any=[{title:"Task1"},{title:"Task2"}]

  ngOnInit() {
  }

  addTab(){
    
    this.listOfBoard.push({title:'Task3'})
  }

}
