import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { MessagePreviewDialogComponent } from './admin/message-preview-dialog/message-preview-dialog.component';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CopyrightComponent } from './copyright/copyright.component';
import { LoginComponent } from './login/login.component';
import { OrderPreviewComponent } from './admin/order-preview/order-preview.component';
import { MailAnswerComponent } from './admin/order-preview/mail-answer/mail-answer.component';
import { ChangeLoginComponent } from './admin/change-login/change-login.component';
import { LoginRoutingModule } from "./login/login.module";
import { ChartsModule } from 'ng2-charts';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    CopyrightComponent,
    LoginComponent,
    AdminComponent,
    MessagePreviewDialogComponent,
    OrderPreviewComponent,
    MailAnswerComponent,
    ChangeLoginComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ChartsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    LoginRoutingModule,
    HttpClientModule,
    CKEditorModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [HttpClientModule,
    {provide:LocationStrategy,useClass:HashLocationStrategy}
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  entryComponents: [MessagePreviewDialogComponent, OrderPreviewComponent, MailAnswerComponent, ChangeLoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
