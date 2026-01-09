import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SignInComponent } from './demo/pages/authentication/sign-in/sign-in.component';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { LoginComponent } from './demo/pages/login/login.component';
import { RouterOutlet } from '@angular/router';


@NgModule({
  declarations: [
    //LoginComponent,
    // AppComponent,
    /*AdminComponent*/
  ],
  imports: [
    //BrowserModule,
    //AppRoutingModule,
    //BrowserModule,
    //HttpClientModule, RouterModule,

    //FormsModule,
    //BrowserAnimationsModule, AppComponent,
    //ReactiveFormsModule, HttpClientModule, CommonModule, RouterOutlet
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    

  ],
  providers: [],
  bootstrap: [AppComponent]
  /*bootstrap: [SignInComponent]*/
  /*  bootstrap: [AdminComponent]*/
 /* bootstrap: [LoginComponent]*/
})
export class AppModule { }
