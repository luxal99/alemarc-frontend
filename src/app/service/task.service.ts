import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private list: Array<any> = [];
  private listOfBoardByUser = new Set(this.list);

  constructor(public http:HttpClient) { }

  pushArray(arr){
    this.listOfBoardByUser = arr
  }

  getListOfBoardsByUser(){
    return this.listOfBoardByUser;
  }

  getListOfBoardByUserId(id_client){
    return this.http.get("/admin/board/getBoardPerUser/"+id_client,{responseType:'json'});
  }
}
