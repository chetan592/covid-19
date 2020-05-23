import { Component ,ViewChild,ChangeDetectorRef} from '@angular/core';
import {WebserviceService} from './webservice.service'
import { compileInjectable, ThrowStmt } from '@angular/compiler';
import {Subscription,timer, of} from 'rxjs'
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort'
import { switchMap, catchError } from 'rxjs/operators';
import {Router,ActivatedRoute} from '@angular/router'
import { country } from './Models/country.model';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Corona';
  district_data;
  activeCount=0;
  confirmedCount=0;
  recoveredCases=0;
  sub:Subscription;
  sub2:Subscription;
  states:Array<string>=[];
  loaded=false
  //private paginator:MatPaginator
  /*
  worldStats= {
    "NewConfirmed": 101362,
    "TotalConfirmed": 4617583,
    "NewDeaths": 5335,
    "TotalDeaths": 313328,
    "NewRecovered": 49174,
    "TotalRecovered": 1636416
  }*/
  worldStats:World;

  constructor(private routes:ActivatedRoute,public web:WebserviceService,private route:Router,private changeDetector : ChangeDetectorRef){



  }

  ngOnInit():void{

    this.sub2 = timer(0,610000).pipe(
      catchError(err=>of(err)),
      switchMap(()=>this.web.getGlobalStats())
    ).subscribe((result)=>{
      this.worldStats=result
      this.loaded=true
    });

  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

ngOnDestroy(): void {
  //Called once, before the instance is destroyed.
  //Add 'implements OnDestroy' to the class.
  this.sub2.unsubscribe();
}


}
