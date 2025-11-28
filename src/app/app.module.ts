import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // ← Agrega esta línea

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { Module1Component } from './components/module1/module1.component';
import { Module2Component } from './components/module2/module2.component';
import { Module3Component } from './components/module3/module3.component';
import { Module4Component } from './components/module4/module4.component';
import { Module5Component } from './components/module5/module5.component';
import { Module6Component } from './components/module6/module6.component';
import { Module7Component } from './components/module7/module7.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Module1Component,
    Module2Component,
    Module3Component,
    Module4Component,
    Module5Component,
    Module6Component,
    Module7Component,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule // ← Agrega esta línea
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }