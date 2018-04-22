import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ResultItem, ProductLocation } from '../components/search/search.component';
import { HttpResponse } from 'selenium-webdriver/http';

@Injectable()
export class DataService {
  public LoggedUser: any;
  public LoggedIn: boolean;
  constructor(private http: Http) {
    console.log("connected");
    this.LoggedUser = { name: "Hard Coded", activefoodchains: ["5a8ab229c80fcd15e70901a9", "5a8ab27ec80fcd15e70901aa"] }
  }

  searchProduct(latitude: number, longitude: number, distance: number): Observable<SearchResult> {
    console.log("connecting and searching");
    var foodchainquery = "";
    this.LoggedUser.activefoodchains.forEach(element => {
      foodchainquery += "foodchains[]=" + element + "&";
    });
    return this.http.get("/geosearch?" + foodchainquery + "latitude=" + latitude + "&longitude=" + longitude + "&distance=" + distance)
      .map((response: Response) => <SearchResult>
        response.json());


  }

  subscribeTo(productid: string): Observable<any> {
    return this.http.get("/subscribe?productid=" + productid).map((response: Response) => {
      response.json();
    })
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post("/login", { username: username, password: password }).map((response: Response) => response.json())

  }

  getLocations(): Observable<ProductLocation[]> {
    return this.http.get('/locations').map((response: Response) =>
      response.json()
    )
  }

  userFoodChains(): Observable<ScanList> {
    return this.http.get("/scanlist").map((response: Response) => <ScanList>response.json(), err => console.log("error getting myscan"))
  }
  addFoodChain(foodchainid: number) {

    return this.http.post("/subscribe", { fcid: foodchainid }).map((response: Response) => response.json(), err => console.log("error adding foodchain to scanner"))
  }
  removeFoodChain(foodchainid: number): Observable<any> {
    var foodchain = { fcid: foodchainid }
    return this.http.post("/unsubscribe", { fcid: foodchainid }).map((response: Response) => response.json())
  }
  choosenResult(resultid:string,searchid:string):Observable<any>{
    var model = {resultid:resultid,searchid:searchid};
    return this.http.post('/choosenResult',model).map((response:Response)=>{ response.json();})

  }


  logout() {
    return this.http.post("/logout", {}).map((response: Response) => {
      response.json();
    })
  }




}
export class ScanList {
  foodchains: { name: string, id: number, selected: boolean }[];

}
export class DisplayElement {
  foodchains: ResultItem;
  locations: [ProductLocation]

}
export class SearchResult{
  searchid:string;
  data:DisplayElement[];

}
