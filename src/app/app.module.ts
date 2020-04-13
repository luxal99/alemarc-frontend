import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { MessagePreviewDialogComponent } from './admin/message-preview-dialog/message-preview-dialog.component';
import { BasicElementComponent } from './basic-element/basic-element.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CopyrightComponent } from './copyright/copyright.component';
import { LoginComponent } from './login/login.component';
import { OrderSiteComponent } from './order-site/order-site.component';
import { OrderPreviewComponent } from './admin/order-preview/order-preview.component';
import { MailAnswerComponent } from './admin/order-preview/mail-answer/mail-answer.component';
import { ChangeLoginComponent } from './admin/change-login/change-login.component';
import { LoginRoutingModule } from "./login/login.module";
import { AboutRoutingModule } from "./about/about.module";
import { OrderRoutingModule } from "./order-site/order.module";
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { BlogDialogComponent } from './admin/blog-dialog/blog-dialog.component';
import { BlogPreviewDialogComponent } from './admin/blog-preview-dialog/blog-preview-dialog.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { BlogDetailComponent } from './home/blog-detail/blog-detail.component';
import { TaskBoardComponent } from './admin/task-board/task-board.component';
import { TaskDialogDetailComponent } from './admin/task-board/task-dialog-detail/task-dialog-detail.component';
import { CreateBoardDialogComponent } from './admin/task-board/create-board-dialog/create-board-dialog.component';
import { AddNewTaskDialogComponent } from './admin/task-board/add-new-task-dialog/add-new-task-dialog.component';
import { ChartsModule } from 'ng2-charts';
import { ImgShowDialogComponent } from './admin/task-board/task-dialog-detail/img-show-dialog/img-show-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    FooterComponent,
    HomeComponent,
    BasicElementComponent,
    AboutComponent,
    CopyrightComponent,
    LoginComponent,
    AdminComponent,
    MessagePreviewDialogComponent,
    OrderSiteComponent,
    OrderPreviewComponent,
    MailAnswerComponent,
    ChangeLoginComponent,
    BlogDialogComponent,
    BlogPreviewDialogComponent,
    BlogDetailComponent,
    TaskBoardComponent,
    TaskDialogDetailComponent,
    CreateBoardDialogComponent,
    AddNewTaskDialogComponent,
    ImgShowDialogComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    NgxUsefulSwiperModule,
    ReactiveFormsModule,
    AppRoutingModule,
    LoginRoutingModule,
    OrderRoutingModule,
    AboutRoutingModule,
    HttpClientModule,
    CKEditorModule,
    ChartsModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [HttpClientModule,
    {provide:LocationStrategy,useClass:HashLocationStrategy}
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  entryComponents: [ImgShowDialogComponent,AddNewTaskDialogComponent,TaskDialogDetailComponent,MessagePreviewDialogComponent,TaskDialogDetailComponent,CreateBoardDialogComponent,BlogDialogComponent,BlogPreviewDialogComponent, OrderPreviewComponent, MailAnswerComponent, ChangeLoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
