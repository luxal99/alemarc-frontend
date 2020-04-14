import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private list: Array<any> = [];
  private listOfBoardByUser = new Set(this.list);

  constructor() { }

  pushArray(arr){
    this.listOfBoardByUser = arr
  }

  getListOfBoardsByUser(){
    return this.listOfBoardByUser;
  }
}
