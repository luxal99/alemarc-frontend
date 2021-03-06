import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';;
import { AuthService } from "./service/auth.service";
import { ErrorComponent } from './error/error.component';
import { BlogPreviewComponent } from './blog-preview/blog-preview.component';
import {FooterComponent} from './footer/footer.component';

const routes: Routes = [
  { path: '', component: HomeComponent, },
  {
    path: 'login', component: LoginComponent,
  },
  { path: 'err', component: ErrorComponent },
  {path:'contact', component: FooterComponent},
  { path: 'admin', component: AdminComponent, canActivate: [AuthService] },
  { path: 'blog/:id', component: BlogPreviewComponent },
  { path: '**', component: ErrorComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
