import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';;
import { AuthService } from "./service/auth.service";
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  { path: '', component: HomeComponent, },
  {
    path: 'login', component: LoginComponent,
  },
  { path: 'err', component: ErrorComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthService] },
  { path: '**', component: ErrorComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
