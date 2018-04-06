import { Component, OnInit } from '@angular/core';
import { DataService } from './../../services/data.service';
import { DisplayElement } from './../../services/data.service';
import { trigger, style, state, transition, animate, keyframes } from '@angular/animations';
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [trigger('loading', [
    state('down', style({
      opacity: '1',
      transform: ' scale(1) '



    })),
    state('disapear', style({
      opacity: '0',
      transform: 'scale(8) translateY(+50px)'



    })),

    state('up', style({
      opacity: '0',
      transform: 'translateY(-300px) scale(0.5)'



    })),
    transition('down => up', animate('250ms ease-in')),
    transition('disapear => down', animate('400ms ease-in'))
  ])]
})
export class SearchComponent implements OnInit {
  searchresults: DisplayElement[];
  latitude: number;
  longitude: number;
  orange: String;
  green: String;
  red: String;
  //myscanlist: ScanList;
  orangeSub: Subscription;
  redSub: Subscription;
  greenSub: Subscription;
  constructor(private data: DataService) {
    this.orange = "down";
    this.green = "down";
    this.red = "down";
    this.searchresults = [];
  }

  ngOnInit() {

    navigator.geolocation.getCurrentPosition((position: Position) => {
      console.log("got coordinates");
      this.latitude = position.coords.latitude; this.longitude = position.coords.longitude;
      console.log("coords: " + position);
    }, (error: PositionError) => {
      alert("Location Services Unavailable");
    })
   
  }
  subscribeTo(productid: string) {
    console.log("productid:" + productid);
    this.data.subscribeTo(productid).subscribe(results => {
      console.log("subscribed to " + productid);
    }, err => {
      console.log("couldnt subscribe");
    })
  }
  scan(distance: number) {
 ///////////////// ANIMATED LOADER ///////////
 let orangetimer = TimerObservable.create(0, 600);
 let redtimer = TimerObservable.create(0, 800);
 let greentimer = TimerObservable.create(0, 400);
 this.orangeSub = orangetimer.subscribe(function () {
   if (this.orange == "up") {
     this.orange = "disapear";


   } else {
     this.orange == "down" ? this.orange = "up" : this.orange = "down";
   }

 }.bind(this));
 this.redSub = redtimer.subscribe(function () {
   if (this.red == "up") {
     this.red = "disapear";


   } else {
     this.red == "down" ? this.red = "up" : this.red = "down";
   }

 }.bind(this));
 this.greenSub = greentimer.subscribe(function () {
   if (this.green == "up") {
     this.green = "disapear";


   } else {
     this.green == "down" ? this.green = "up" : this.green = "down";
   }

 }.bind(this));
 ////////////////////////////////////////// 
    setInterval(function () { console.log(this.searchresults); }, 3000);
    console.log("started searching  @" + this.latitude + "&" + this.longitude + "in a " + distance + " radius");
    this.data.searchProduct(this.latitude, this.longitude, distance)
      .subscribe(results => {
        console.log("got results result.length:" + results.length);
        //console.log(results[0]);
        this.searchresults = results;
        this.redSub.unsubscribe();
        this.orangeSub.unsubscribe();
        this.greenSub.unsubscribe();
        // console.log(this.searchresults[0]);

        //console.log(this.searchresults[0].product.name);
      }, err => {
        console.log("error: " + err);
      })
  }

}
export class ResultItem {
  name: string;
  image: string;
  locations: [ProductLocation];
  isCollapsed: boolean;


}
export class ShopEntity {
  name: string;
  image: string;
  contacts: { website: string, tel: string, email: string };
  logo: { type: string }
}
export class ProductLocation {
  foodchainid: String;
  datediscovered: String;
  name: String;
  discoveredby: { username: String, id: String };
  address: String;
  loc: GeoJson;
  confirmations: number;
}
export class GeoJson {
  type: string;
  coordinates: [number];
}