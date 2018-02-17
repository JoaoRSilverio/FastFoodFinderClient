import { Component, OnInit } from '@angular/core';
import {DataService} from './../../services/data.service';
import {DisplayElement} from './../../services/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchresults:DisplayElement[];
  latitude:number;
  longitude:number;
  constructor(private data:DataService) { 
 this.searchresults = [];
  }

  ngOnInit() {
   
    navigator.geolocation.getCurrentPosition((position:Position)=> {
      console.log("got result");
      this.latitude = position.coords.latitude; this.longitude = position.coords.longitude ;
      console.log("coords: " + position);
    })
      
  }
  explore(searchterm:string,distance:number){
    
   setInterval(function(){console.log(this.searchresults);},3000);
   console.log("started searching for "+searchterm + " @"+this.latitude+"&"+this.longitude + "in a "+distance +" radius");
    this.data.searchProduct(searchterm,this.latitude,this.longitude,distance )
    .subscribe( results =>{
      console.log("got results result.length:" + results.length);
      //console.log(results[0]);
      this.searchresults = results;
    //  console.log(this.searchresults[0]);
    //console.log(this.searchresults[0].product.name);
    },err =>{
        console.log("error: "+ err);
      })
  }

}
export class ResultItem{
  name:string;
  brand:string;
  description:string;
  image:string;
  points:number;
  followers:number;
  dateadded:string;
  confirmations:number
  price:{value:string,currency:string};
  feconfirmed:boolean;
  shopentity:ShopEntity;
  tags:[string];
  locations:[ProductLocation];
  isCollapsed:boolean;
  
}
export class ShopEntity{
  name:string;
    image:string;
    contacts:{website:string,tel:string,email:string};
    logo:{type:string}
}
export class ProductLocation{
  productid:String;
  datediscovered:String;
  discoveredby:{username:String,id:String};
  address:String;
  loc:GeoJson;
  confirmations:number;
}
export class GeoJson{
  type:string;
  coordinates:[number];
}