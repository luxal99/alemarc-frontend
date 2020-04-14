import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService implements CanActivate {

  constructor(public http: HttpClient, private router: Router) { }

  getAllMessages(token) {
    return this.http.get("/admin/getAllMessages/" + token, { responseType: 'json' });
  }
  deleteMail(id_mail) {
    return this.http.delete("/admin/deleteMessage/" + id_mail, { responseType: 'text' });
  }
  sendMail(mail) {
    return this.http.post("/admin/sendMail", mail, { responseType: 'text' });
  }
  getAllOrders() {
    return this.http.get("/admin/getAllOrders", { responseType: 'json' });
  }
  deleteOrder(id_site_order) {
    return this.http.delete('/admin/deleteOrder/' + id_site_order, { responseType: 'text' });
  }
  login(user) {
    return this.http.post('/admin/getPassword', user, { responseType: 'json' });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('token')) { // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  logout(isAuthenticated) {
    return this.http.post('/admin/logout', isAuthenticated, { responseType: 'text' });
  }
  changeLogin(user) {
    return this.http.put('/admin/changeLogin', user, { responseType: 'text' });
  }

  saveBlog(blog) {
    return this.http.post("/admin/saveBlog", blog, { responseType: 'text' });
  }

  getBlogs() {
    return this.http.get('/admin/getBlogs', { responseType: 'json' });
  }

  deleteBlog(_id) {
    return this.http.delete("/admin/deleteBlog/" + _id, { responseType: 'text' });
  }

  findBlogById(_id) {
    return this.http.get("/admin/getOneBlog/" + _id, { responseType: 'json' })
  }
  
  uploadPhoto(photos) {
    return this.http.post("/admin/upload", photos, { responseType: 'text' })
  }

  createNewTaskBoard(board) {
    return this.http.post("/admin/createBoard", board, { responseType: 'json' });
  }

  getBoard(){
    return this.http.get("/admin/board/getBoard",{responseType:'json'})
  }

  createNewTask(task){
    return this.http.post("/admin/board/createTask",task,{responseType:'text'});
  }

  uploadAttachment(attachemnts){
    return this.http.post("/admin/board/upload", attachemnts, { responseType: 'text' })
  }

  updateTask(task){
    return this.http.put("/admin/board/updateTask",task,{responseType:'text'});
  }


  deleteAttachment(url){
    return this.http.post("/admin/board/updateAttachmentList",url,{responseType:'text'});
  }

  // Add attachment to board
  updateAttachment(attachemnt){
    return this.http.post("/admin/board/addNewAttachment",attachemnt,{responseType:'text'})
  }

  /**
   * 
   * @param id_task_board
   * @returns listOfTasks for cureent board 
   */
  getTaskList(id_task_board){
    return this.http.get("/admin/board/getTaskList/"+id_task_board,{responseType:'json'});
  }

  getTaskAnalyse(){
    return this.http.get("/admin/board/getTaskAnalizeAll",{responseType:'json'});
  }

  getTaskPerBoard(){
   return this.http.get("/admin/board/getTaskPerBoard",{responseType:'json'});  
  }

  getArchivedTask(id_task_board){
    return this.http.get("/admin/board/getArchivedTask/"+id_task_board,{responseType:'json'});
  }

  unArchiveAll(taskList){
    return this.http.put("/admin/board/unArchiveAll",taskList,{responseType:'text'});
  }
}
