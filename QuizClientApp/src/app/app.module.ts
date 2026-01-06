
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './demo/pages/authentication/sign-in/sign-in.component';
import { AdminComponent } from './theme/layout/admin/admin.component'
@NgModule({
  declarations: [
   /* AppComponent*/
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
 /* bootstrap: [SignInComponent]*/
/*  bootstrap: [AdminComponent]*/
})
export class AppModule { }
