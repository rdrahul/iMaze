//import { bootstrap } from 'angular2/platform/browser' ;
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './components/app.component';
import { HttpModule  } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule , Routes } from '@angular/router';

import { ImageComponent } from './components/image.component';
import {SearchComponent} from './components/search.component';
import {QueriesComponent} from './components/queries.component';

import { MaterializeModule } from 'angular2-materialize';
import {MaterializeDirective} from 'angular2-materialize';

const appRoutes:Routes = [
  { path : 'images/:query', component:ImageComponent},
  { path : 'queries' , component: QueriesComponent },
  { path : '', component : SearchComponent }
];

@NgModule({
  imports:      [   BrowserModule, 
                    FormsModule,
                    HttpModule ,
                    RouterModule.forRoot(appRoutes) ],
  declarations: [ AppComponent, MaterializeDirective, ImageComponent , SearchComponent, QueriesComponent ],
  bootstrap:    [ AppComponent ],
  providers : []

})

export class AppModule { }


