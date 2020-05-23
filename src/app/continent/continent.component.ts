import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import {WebserviceService} from '../webservice.service';
import {Subscription} from 'rxjs';
import * as Highcharts from 'highcharts';


@Component({
  selector: 'app-continent',
  templateUrl: './continent.component.html',
  styleUrls: ['./continent.component.scss']
})
export class ContinentComponent implements OnInit {
  sub:Subscription
  apiData;
  data;
  continent:string;
  progressSpinner:boolean=true;
  res={
    "updated": 1589906008421,
    "cases": 838212,
    "todayCases": 19277,
    "deaths": 25382,
    "todayDeaths": 271,
    "recovered": 484170,
    "active": 328660,
    "critical": 4979,
    "casesPerOneMillion": 182.02,
    "deathsPerOneMillion": 5.51,
    "tests": 13974652,
    "testsPerOneMillion": 3034.58,
    "population": 4605139245,
    "continent": "Asia",
    "activePerOneMillion": 71.37,
    "recoveredPerOneMillion": 105.14,
    "criticalPerOneMillion": 1.08,
    "countries": [
        "Afghanistan",
        "Armenia",
        "Azerbaijan",
        "Bahrain",
        "Bangladesh",
        "Bhutan",
        "Brunei",
        "Cambodia",
        "China",
        "Cyprus",
        "Georgia",
        "Hong Kong",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Israel",
        "Japan",
        "Jordan",
        "Kazakhstan",
        "Kuwait",
        "Kyrgyzstan",
        "Lao People\"s Democratic Republic",
        "Lebanon",
        "Macao",
        "Malaysia",
        "Maldives",
        "Mongolia",
        "Myanmar",
        "Nepal",
        "Oman",
        "Pakistan",
        "Palestine",
        "Philippines",
        "Qatar",
        "S. Korea",
        "Saudi Arabia",
        "Singapore",
        "Sri Lanka",
        "Syrian Arab Republic",
        "Taiwan",
        "Tajikistan",
        "Thailand",
        "Timor-Leste",
        "Turkey",
        "UAE",
        "Uzbekistan",
        "Vietnam",
        "Yemen"
    ]
}


  constructor(private _router:Router,private route:ActivatedRoute,private web:WebserviceService) {
  }

  ngOnInit() {
    console.log("continent ngOnit")
    this.sub=this.route.queryParams.subscribe(res=>{
      console.log(res)
      this.continent=res.continent
    });

    this.web.getContinentData(this.continent).subscribe(res=>
      {
        if(res){
          this.apiData=res;
          this.progressSpinner=false
        }
      });

     //this.progressSpinner=false
   //this.apiData=this.res

  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }


}
