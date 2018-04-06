import { Component, OnInit } from '@angular/core';
import { ProductLocation } from '../search/search.component';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

myLocations : ProductLocation[];

filteredResults : FilteredLocations[];
  constructor(private data : DataService) { 
   // this.foodchains = [];
   
    this.filteredResults =  [];
 
    this.data.getLocations().subscribe(function(response){
      console.log(this.filteredResults);
      
      response.forEach(function(element){
      if(this.filteredResults.findIndex(s=>s.name == element.name) == -1){
        this.filteredResults.push( new FilteredLocations(element.name,element));
      }else{
        let index = this.filteredResults.findIndex(s=>s.name == element.name);
        this.filteredResults[index].locations.push(element);
      }

    }.bind(this) )
    }.bind(this) )
    
  }

  ngOnInit() {

  }

}
class FilteredLocations{
  constructor(name:String,pl:ProductLocation){
    this.locations = [];
    this.locations.push(pl)
    this.name = name;
  }
  name : String;
  locations:ProductLocation[]
}
