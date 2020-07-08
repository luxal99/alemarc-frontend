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
  },
  { path: 'admin', component: AdminComponent, canActivate: [AdminService] }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
