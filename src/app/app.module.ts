import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
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
import { ArchiveDialogComponent } from './admin/task-board/archive-dialog/archive-dialog.component';
import { BoardLoginComponent } from "./admin/task-board/board-login/board-login.component";
import { BoardRegistrationDialogComponent } from './admin/task-board/board-login/board-login-dialog/board-registration-dialog.component';
import { UserProfileDialogComponent } from './admin/task-board/user-profile-dialog/user-profile-dialog.component';
import { AngularFireModule } from 'angularfire2';
import {
  AngularFireStorageModule,
  AngularFireStorageReference,
  AngularFireUploadTask,
  StorageBucket
} from "@angular/fire/storage";
import { SurveyDialogComponent } from './home/survey-dialog/survey-dialog.component';
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
    ImgShowDialogComponent,
    ArchiveDialogComponent,
    BoardLoginComponent,
    BoardRegistrationDialogComponent,
    UserProfileDialogComponent,
    SurveyDialogComponent
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
    AngularFireStorageModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyAz8PX_PdPZo7WmWuxLYVMDiJUOozl0Fn4",
      authDomain: "soy-smile-249718.firebaseapp.com",
      databaseURL: "https://soy-smile-249718.firebaseio.com",
      projectId: "soy-smile-249718",
      storageBucket: "soy-smile-249718.appspot.com",
      messagingSenderId: "870517553704",
      appId: "1:870517553704:web:d238ce266071d519f8131d",
      measurementId: "G-JGV7HTSL0B"
    }),
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [HttpClientModule,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  entryComponents: [BoardRegistrationDialogComponent, ImgShowDialogComponent, ArchiveDialogComponent, AddNewTaskDialogComponent,
    TaskDialogDetailComponent, MessagePreviewDialogComponent, TaskDialogDetailComponent
    , CreateBoardDialogComponent, BlogDialogComponent, BlogPreviewDialogComponent,
    OrderPreviewComponent,SurveyDialogComponent, MailAnswerComponent, ChangeLoginComponent, UserProfileDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
