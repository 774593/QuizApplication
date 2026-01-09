import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app.module';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { routes } from './app/app-routing.module';
import { environment } from './environments/environment';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';

//platformBrowser().bootstrapModule(AppModule, {
//  ngZoneEventCoalescing: true,
//})
//  .catch(err => console.error(err));
//bootstrapApplication(AppComponent, {
//  providers: [
//    provideRouter(routes)
//  ]
//}).catch(err => console.error(err));
platformBrowser().bootstrapModule(AppModule);
