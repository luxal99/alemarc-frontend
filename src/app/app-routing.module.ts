import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { OrderSiteComponent } from './order-site/order-site.component';
import { AdminService } from './service/admin.service';
import { BlogDetailComponent } from "./home/blog-detail/blog-detail.component";
import { TaskBoardComponent } from './admin/task-board/task-board.component';
import { BoardLoginComponent } from './admin/task-board/board-login/board-login.component';
import { ClientService } from './service/client.service';

const routes: Routes = [
  { path: '', component: HomeComponent, },
  {
    path: 'login', component: LoginComponent,
    //loadChildren:()=>import('./login/login.module').then(m=>m.LoginRoutingModule)
  },
  { path: 'blog/:id', component: BlogDetailComponent },
  {
    path: 'about', component: AboutComponent,
    loadChildren: () => import('./about/about.module').then(m => m.AboutRoutingModule)

  },
  {
    path: 'order', component: OrderSiteComponent,
    loadChildren: () => import('./order-site/order.module').then(m => m.OrderRoutingModule)

  },
  { path: 'admin', component: AdminComponent, canActivate: [AdminService] },
  { path: 'board', component: TaskBoardComponent,data:{preload:true},canActivate:[ClientService]},
  {path:'board/login',component:BoardLoginComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
