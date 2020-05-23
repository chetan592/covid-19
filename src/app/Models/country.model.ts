import {Deserializable} from './deserializer.model';
import {Injectable} from '@angular/core'
export class country{
    constructor(
    public country,
    public cases,
    public todayCases,
    public deaths,
    public todayDeaths,
    public recovered,
    public active,
    public critical,
    public casesPerOneMillion,
    public deathsPerOneMillion,
    public tests,
    public testsPerOneMillion,
    public population,
    public continent,
    public activePerOneMillion,
    public recoveredPerOneMillion,
    public criticalPerOneMillion,
    ){

    }
}


@Injectable({
    providedIn: 'root'
})
export class CountryAdapter implements Deserializable<country>{
    deserialize(item:any):country{
        return new country(
        item.country,
        item.cases,
        item.todayCases,
        item.deaths,
        item.todayDeaths,
        item.recovered,
        item.active,
        item.critical,
        item.casesPerOneMillion,
        item.deathsPerOneMillion,
        item.tests,
        item.testsPerOneMillion,
        item.population,
        item.continent,
        item.activePerOneMillion,
        item.recoveredPerOneMillion,
        item.criticalPerOneMillion
        );
    }
}
