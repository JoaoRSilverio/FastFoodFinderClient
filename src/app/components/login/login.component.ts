import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs/Observable';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 // username:string;
  //password:string;
  private loginImg = './assets/images/foodexplorerlogo.png';
  constructor(private dataService:DataService,public router:Router) {
   

   }

  ngOnInit() {
  }
  
  
  login(username,password){
    
     this.dataService.login(username,password).subscribe(result =>{
       this.dataService.LoggedUser = result;
       this.dataService.LoggedIn = true;
      console.log(result);

      this.router.navigate(['/dashboard']);
     },err=>{
       console.log("error while loging in;"+ err);
     })

    //
    
  }


}
