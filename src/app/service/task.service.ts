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

  // createNewTaskBoard(board) {
  //   return this.http.post("/admin/createBoard", board, { responseType: 'json' });
  // }

  // getBoard(){
  //   return this.http.get("/admin/board/getBoard",{responseType:'json'})
  // }

  // createNewTask(task){
  //   return this.http.post("/admin/board/createTask",task,{responseType:'text'});
  // }

  // uploadAttachment(attachemnts){
  //   return this.http.post("/admin/board/upload", attachemnts, { responseType: 'text' })
  // }

  // updateTask(task){
  //   return this.http.put("/admin/board/updateTask",task,{responseType:'text'});
  // }


  // deleteAttachment(url){
  //   return this.http.post("/admin/board/updateAttachmentList",url,{responseType:'text'});
  // }

  // // Add attachment to board
  // updateAttachment(attachemnt){
  //   return this.http.post("/admin/board/addNewAttachment",attachemnt,{responseType:'text'})
  // }

  // /**
  //  * 
  //  * @param id_task_board
  //  * @returns listOfTasks for cureent board 
  //  */
  // getTaskList(id_task_board){
  //   return this.http.get("/admin/board/getTaskList/"+id_task_board,{responseType:'json'});
  // }

  // getTaskAnalyse(){
  //   return this.http.get("/admin/board/getTaskAnalizeAll",{responseType:'json'});
  // }

  // getTaskPerBoard(){
  //  return this.http.get("/admin/board/getTaskPerBoard",{responseType:'json'});  
  // }

  // getArchivedTask(id_task_board){
  //   return this.http.get("/admin/board/getArchivedTask/"+id_task_board,{responseType:'json'});
  // }

  // unArchiveAll(taskList){
  //   return this.http.put("/admin/board/unArchiveAll",taskList,{responseType:'text'});
  // }
}
