import { Component, OnInit } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';
import {DataService} from '../../services/data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 username:string;

  constructor(private dataService:DataService,private router:Router) {
  //  this.username = "teste"
  console.log("ran dashboard");
  this.username = this.dataService.LoggedUser.username;
  if(this.dataService.LoggedIn){
    console.log("logged:"+ this.dataService.LoggedIn)
    
  }else{
    console.log("not logged in redirecting...");
    this.router.navigate(['/']);
  }
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
  logout(){
    this.dataService.logout().subscribe(result => { console.log("// logged out --" +result);this.router.navigate(['/']); },err=>{
      console.log(" error logging out"+err);
     } )
  }
}
