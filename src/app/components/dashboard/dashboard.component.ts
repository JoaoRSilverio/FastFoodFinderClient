import { Component, OnInit } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() {
    

   }

  ngOnInit() {
    console.log("ran dashboard");
  }
  
  selectComponent(active){
    console.log("ran function...");
    /*
    var containers = document.getElementsByClassName("componentcontainer");
    console.log(containers[0]);
    for(var i=0;i<containers.length;i++){
      console.log(containers[i].classList + " compare to " + active);
      
        if(containers[i].classList.contains(active)){
          console.log("passed the if");
          containers[i].setAttribute("height","1px");
          console.log("active "+containers[i].attributes["height"]);
          
        }else{
          containers[i].setAttribute("height","0px");
          console.log("inactive "+ containers[i].attributes["height"]);
        }
    }
    */
    
  }
  
}
