import { Injectable } from '@angular/core';
import {Http,Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import  'rxjs/add/operator/map';
import { ResultItem, ProductLocation } from '../components/search/search.component';

@Injectable()
export class DataService  {

  constructor(public http:Http) {
    console.log("connected");
   }
   searchProduct(searchterm:string,latitude:number,longitude:number,distance:number):Observable<DisplayElement[]>{
    console.log("connecting and searching");
     return this.http.get("/search?searchterm="+searchterm+"&latitude="+latitude+"&longitude="+longitude+"&distance="+distance)
     .map((response:Response) => <DisplayElement[]> 
      response.json());
    
     
   }

   login(username,password){
     console.log("data service username:"+username);
     var user = {username:username,password:password};
     var resp = this.http.post("localhost:8080/login",user);
     
   }


   
   
}
export class DisplayElement{
  product:ResultItem;
  locations:[ProductLocation]

}
