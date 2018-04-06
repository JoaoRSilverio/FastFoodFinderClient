import { Component, OnInit } from '@angular/core';
import { ScanList, DataService } from '../../services/data.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { trigger, style, state, transition, animate, keyframes } from '@angular/animations';
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-myproducts',
  templateUrl: './myproducts.component.html',
  styleUrls: ['./myproducts.component.css'],
  animations: [trigger('loading', [
    state('down', style({
      opacity: '1',
      transform:' scale(1) '



    })),
    state('disapear', style({
      opacity: '0',
      transform:'scale(8) translateY(+50px)'



    })),
    
    state('up', style({
      opacity: '0',
      transform: 'translateY(-300px) scale(0.5)'
      


    })),
    transition('down => up', animate('250ms ease-in')),
    transition('disapear => down', animate('400ms ease-in'))
  ])]
})
export class MyproductsComponent implements OnInit {
  orange: String;
  green:String;
  red:String;
  myscanlist: ScanList;
  orangeSub: Subscription;
  redSub:Subscription;
  greenSub:Subscription;
  constructor(private data: DataService) {
    this.orange = "down";
    this.green = "down";
    this.red = "down";
    console.log("ran construct");
    this.myscanlist = new ScanList();
    this.myscanlist.foodchains = [];


    this.data.userFoodChains().subscribe(list => {
      this.myscanlist = list;
      this.redSub.unsubscribe();
      this.orangeSub.unsubscribe();
      this.greenSub.unsubscribe();
    //  console.log(this.myscanlist.foodchains[0]);
    })

  }

  ngOnInit() {
    let orangetimer = TimerObservable.create(0, 600);
    let redtimer = TimerObservable.create(0, 800);
    let greentimer = TimerObservable.create(0, 400);
    this.orangeSub = orangetimer.subscribe(function () {
      if(this.orange == "up"){
        this.orange = "disapear";
        
        
      }else{
      this.orange == "down" ? this.orange = "up": this.orange = "down" ;
    }
    
    }.bind(this));
    this.redSub = redtimer.subscribe(function () {
      if(this.red == "up"){
        this.red = "disapear";
        
        
      }else{
      this.red == "down" ? this.red = "up": this.red = "down" ;
    }
    
    }.bind(this));
    this.greenSub = greentimer.subscribe(function () {
      if(this.green == "up"){
        this.green = "disapear";
        
        
      }else{
      this.green == "down" ? this.green = "up": this.green = "down" ;
    }
    
    }.bind(this));

    console.log("ran init");

  }
  toggleOption(foodchain, selected) {
    let index = this.myscanlist.foodchains.indexOf(foodchain);
    console.log(index);
    console.log("according to model " + this.myscanlist.foodchains[index].id + " is " + this.myscanlist.foodchains[index].selected)
    console.log("fn input: " + foodchain.id + " " + selected);

    if (selected) {

      this.data.addFoodChain(foodchain.id).subscribe((result) => console.log(result))
    } else {
      this.data.removeFoodChain(foodchain.id).subscribe((result) => console.log(result))
    }




  }
}
