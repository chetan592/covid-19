import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AboutComponent} from './about/about.component'
import {AppComponent} from './app.component';
import {WorldTableComponent} from './world-table/world-table.component'
import { ContinentComponent } from './continent/continent.component';
import { CountryComponent } from './country/country.component';

const routes: Routes = [
  {path:'',component:WorldTableComponent,pathMatch:'full'},
  {path:'about',component:AboutComponent,pathMatch:'full'},
  {path:'continent_asia',component:ContinentComponent,pathMatch:'full'},
  {path:'continent_africa',component:ContinentComponent,pathMatch:'full'},
  {path:'continent_south_america',component:ContinentComponent,pathMatch:'full'},
  {path:'continent_north_america',component:ContinentComponent,pathMatch:'full'},
  {path:'continent_europe',component:ContinentComponent,pathMatch:'full'},
  {path:'continent_australia',component:ContinentComponent,pathMatch:'full'},
  {path:'country',component:CountryComponent,pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
