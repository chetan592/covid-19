import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//service import
import {WebserviceService} from './webservice.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

//material elements imports
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { AboutComponent } from './about/about.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { WorldTableComponent } from './world-table/world-table.component';
import { ContinentComponent } from './continent/continent.component';
import { CountryComponent } from './country/country.component';
import {HighchartsChartModule} from 'highcharts-angular';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ErrorInterceptor } from './error.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    WorldTableComponent,
    ContinentComponent,
    CountryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    HighchartsChartModule,
    MatProgressSpinnerModule,

  ],
  providers: [WebserviceService,{
    provide:HTTP_INTERCEPTORS,
    useClass:ErrorInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
