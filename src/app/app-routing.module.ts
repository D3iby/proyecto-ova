import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { Module1Component } from './components/module1/module1.component';
import { Module2Component } from './components/module2/module2.component';
import { Module3Component } from './components/module3/module3.component';
import { Module4Component } from './components/module4/module4.component';
import { Module5Component } from './components/module5/module5.component';
import { Module6Component } from './components/module6/module6.component';
import { Module7Component } from './components/module7/module7.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'module1', component: Module1Component },
  { path: 'module2', component: Module2Component },
  { path: 'module3', component: Module3Component },
  { path: 'module4', component: Module4Component },
  { path: 'module5', component: Module5Component },
  { path: 'module6', component: Module6Component },
  { path: 'module7', component: Module7Component },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }