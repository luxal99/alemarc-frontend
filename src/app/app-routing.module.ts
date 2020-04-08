import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { OrderSiteComponent } from './order-site/order-site.component';
import { AdminService } from './service/admin.service';


const routes: Routes = [
  { path: '', component: HomeComponent, },
  {
    path: 'login',component:LoginComponent,
    //loadChildren:()=>import('./login/login.module').then(m=>m.LoginRoutingModule)
  },
  {
    path: 'about', component: AboutComponent,
     loadChildren:()=>import('./about/about.module').then(m=>m.AboutRoutingModule)
    
  },
  {
    path: 'order',component:OrderSiteComponent,
   loadChildren:()=>import('./order-site/order.module').then(m=>m.OrderRoutingModule) 
    
  },
  { path: 'admin', component: AdminComponent, canActivate: [AdminService] }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
