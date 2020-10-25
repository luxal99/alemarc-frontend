import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CopyrightComponent } from './copyright/copyright.component';
import { LoginComponent } from './login/login.component';
import { ChangeLoginComponent } from './admin/change-login/change-login.component';
import { LoginRoutingModule } from "./login/login.module";
import { ChartsModule } from 'ng2-charts';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AddTechnologyDialogComponent } from './admin/add-technology-dialog/add-technology-dialog.component';
import { ErrorComponent } from './error/error.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { BlogPreviewComponent } from './blog-preview/blog-preview.component';
import { OverviewComponent } from './admin/overview/overview.component';
import { EditBlogDialogComponent } from './admin/overview/edit-blog-dialog/edit-blog-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    CopyrightComponent,
    LoginComponent,
    AdminComponent,
    ChangeLoginComponent,
    AddTechnologyDialogComponent,
    ErrorComponent,
    BlogPreviewComponent,
    OverviewComponent,
    EditBlogDialogComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ChartsModule,
    NgxUsefulSwiperModule,
    ReactiveFormsModule,
    AppRoutingModule,
    LoginRoutingModule,
    HttpClientModule,
    CKEditorModule,
    MaterialModule,
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
    BrowserAnimationsModule
  ],
  providers: [HttpClientModule,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  entryComponents: [AddTechnologyDialogComponent, ChangeLoginComponent, OverviewComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
