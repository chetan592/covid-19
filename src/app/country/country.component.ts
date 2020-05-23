import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WebserviceService} from '../webservice.service'
import * as Highcharts from 'highcharts';
import { catchError, switchMap } from 'rxjs/operators';
import { of, Subscription ,timer} from 'rxjs';
import { country } from '../Models/country.model';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  cDataAv:boolean=false;
  activeCountry;
  timeSeriesData;
  chartOptions:{};
  recoveredY:Array<any>;
  casesY:Array<any>;
  deathsY:Array<any>;
  dateX:Array<any>;
  loadChart:boolean=false;
  progressSpinner:boolean=true;
  CountryData:country;
  Highcharts;
  sub1:Subscription;
  sub2:Subscription;
  temp={
    "country": "India",
    "province": [
        "mainland"
    ],
    "timeline": {
        "cases": {
            "4/20/20": 18539,
            "4/21/20": 20080,
            "4/22/20": 21370,
            "4/23/20": 23077,
            "4/24/20": 24530,
            "4/25/20": 26283,
            "4/26/20": 27890,
            "4/27/20": 29451,
            "4/28/20": 31324,
            "4/29/20": 33062,
            "4/30/20": 34863,
            "5/1/20": 37257,
            "5/2/20": 39699,
            "5/3/20": 42505,
            "5/4/20": 46437,
            "5/5/20": 49400,
            "5/6/20": 52987,
            "5/7/20": 56351,
            "5/8/20": 59695,
            "5/9/20": 62808,
            "5/10/20": 67161,
            "5/11/20": 70768,
            "5/12/20": 74292,
            "5/13/20": 78055,
            "5/14/20": 81997,
            "5/15/20": 85784,
            "5/16/20": 90648,
            "5/17/20": 95698,
            "5/18/20": 100328,
            "5/19/20": 106475
        },
        "deaths": {
            "4/20/20": 592,
            "4/21/20": 645,
            "4/22/20": 681,
            "4/23/20": 721,
            "4/24/20": 780,
            "4/25/20": 825,
            "4/26/20": 881,
            "4/27/20": 939,
            "4/28/20": 1008,
            "4/29/20": 1079,
            "4/30/20": 1154,
            "5/1/20": 1223,
            "5/2/20": 1323,
            "5/3/20": 1391,
            "5/4/20": 1566,
            "5/5/20": 1693,
            "5/6/20": 1785,
            "5/7/20": 1889,
            "5/8/20": 1985,
            "5/9/20": 2101,
            "5/10/20": 2212,
            "5/11/20": 2294,
            "5/12/20": 2415,
            "5/13/20": 2551,
            "5/14/20": 2649,
            "5/15/20": 2753,
            "5/16/20": 2871,
            "5/17/20": 3025,
            "5/18/20": 3156,
            "5/19/20": 3302
        },
        "recovered": {
            "4/20/20": 3273,
            "4/21/20": 3975,
            "4/22/20": 4370,
            "4/23/20": 5012,
            "4/24/20": 5498,
            "4/25/20": 5939,
            "4/26/20": 6523,
            "4/27/20": 7137,
            "4/28/20": 7747,
            "4/29/20": 8437,
            "4/30/20": 9068,
            "5/1/20": 10007,
            "5/2/20": 10819,
            "5/3/20": 11775,
            "5/4/20": 12847,
            "5/5/20": 14142,
            "5/6/20": 15331,
            "5/7/20": 16776,
            "5/8/20": 17887,
            "5/9/20": 19301,
            "5/10/20": 20969,
            "5/11/20": 22549,
            "5/12/20": 24420,
            "5/13/20": 26400,
            "5/14/20": 27969,
            "5/15/20": 30258,
            "5/16/20": 34224,
            "5/17/20": 36795,
            "5/18/20": 39233,
            "5/19/20": 42309
        }
    }
}

  constructor(private route:ActivatedRoute,
    private web:WebserviceService
    ) {
      this.recoveredY=[];
      this.casesY=[];
      this.deathsY=[];
      this.dateX=[];
     }

  ngOnInit() {
    this.route.queryParams.subscribe(res=>{
      this.activeCountry=res.county
    });

    this.sub1=this.web.getHistoricalDataByCountry(this.activeCountry).pipe(
        catchError(err=>of('none'))
      )
      .subscribe(res=>{
        console.log('inside his',res)
        if(res!='none'){
          console.log("res available")
          this.timeSeriesData=res;
          this.process_Series(this.timeSeriesData)
          this.Highcharts=Highcharts
          this.chartOptions = {
          chart: {
            type: "spline"
          },
          title: {
            text: "Cases , deaths and recoveries of last 30 days in " +this.activeCountry
          },
          subtitle: {
            text: "Source: Public APIs"
          },
          xAxis:{
            categories:this.dateX
          },
          yAxis: {
            title:{
                text:"Numbers"
            }
          },

          series: [
            {
                name: 'cases',
                data: this.casesY
            },
            {
              name: 'deaths',
              data: this.deathsY
          },
            {
                name: 'recoverd',
                data: this.recoveredY
            }

          ],
          responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle'
      }
          };
          this.loadChart=true;
          this.progressSpinner=false;
        }
        else if(res=='none'){
          this.progressSpinner=false;
        }
        }
      );


    this.sub2=timer(0,3600000).pipe(
      switchMap(()=>this.web.getCurrentDataOfCountry(this.activeCountry)),
      catchError(err=>of(err))
    ).subscribe(res=>{
      console.log("response in c",res)
      if(res!='none'){
        this.cDataAv=true;
        this.CountryData=res
      }
    }
    );

    /*
    this.process_Series(this.temp)
    this.chartOptions = {
      chart: {
         type: "spline"
      },
      title: {
         text: "Cases , deaths and recoveries of last 30 days"
      },
      subtitle: {
         text: "Source: Public APIs"
      },
      xAxis:{
         categories:this.dateX
      },
      yAxis: {
         title:{
            text:"Numbers"
         }
      },

      series: [
         {
            name: 'cases',
            data: this.casesY,
            color:'red'
         },
         {
          name: 'deaths',
          data: this.deathsY,
          color:'orange'
       },
         {
            name: 'recoverd',
            data: this.recoveredY,
            color:'green'
         }

      ],
      responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
  }
   };*/
    console.log(this.dateX)


  }


  process_Series(data){
    for(let i in data){
      if(i=="timeline"){
        let timeline=data[i]
        for(let v in timeline){
          let t=timeline[v]
          for(let xy in t){
            if(v=="cases"){
              this.dateX.push(xy)
              this.casesY.push(t[xy])
            }
            else if(v=="deaths"){
              this.deathsY.push(t[xy])
            }
            else if(v=="recovered"){
              this.recoveredY.push(t[xy])
            }
          }
        }
      }
    }
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

}
