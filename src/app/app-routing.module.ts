import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { AdminService } from './service/admin.service';


const routes: Routes = [
  { path: '', component: HomeComponent, },
  {
    path: 'login',component:LoginComponent,
    //loadChildren:()=>import('./login/login.module').then(m=>m.LoginRoutingModule)
  },
  {
    path: 'about', component: AboutComponent
    
  },
  {
    path: 'order',component:OrderSiteComponent
  },
  { path: 'admin', component: AdminComponent, canActivate: [AdminService] }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
