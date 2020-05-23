import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable, from}from 'rxjs'
import {country,CountryAdapter} from './Models/country.model'
import {map} from 'rxjs/operators'
import { CountryComponent } from './country/country.component';
@Injectable({
  providedIn: 'root'
})
export class WebserviceService {

  countryapi="https://corona.lmao.ninja/v2/countries";
  historicalDataCountry_api="https://corona.lmao.ninja/v2/historical/";
  countryCurrentData_api="https://corona.lmao.ninja/v2/countries/";
  worldData_api="https://corona.lmao.ninja/v2/all";

  constructor(private http:HttpClient,private adapter:CountryAdapter) {

   }

   getCurrentData():Observable<JSON>{
     return this.http.get<JSON>("https://api.covid19india.org/state_district_wise.json")
   }

   getGlobalStats():Observable<World>{
     console.log("global called")
     return this.http.get<World>(this.worldData_api)
   }

   getHistoricalDataByCountry(con:string):Observable<JSON>{
     return this.http.get<JSON>(this.historicalDataCountry_api+con)
   }

   getCurrentDataOfCountry(con:string):Observable<country>{
    return this.http.get(this.countryCurrentData_api+con).pipe(
      map((data: any)=>this.adapter.deserialize(data)),
      );
   }

   getAllCountriesData(): Observable<country[]> {
     console.log("all countries")
    return this.http.get(this.countryapi).pipe(
      map((data: any[]) => data.map(item => this.adapter.deserialize(item))),
      );
  }

   getContinentData(continent:string){
    return this.http.get<JSON>("https://corona.lmao.ninja/v2/continents/"+continent)

   }
}
