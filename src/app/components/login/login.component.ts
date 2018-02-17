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
  constructor(private dataService:DataService,public router:Router) {
    

   }

  ngOnInit() {
  }
  
  
  login(username,password){
    console.log(username + " " + password);
    this.router.navigate(['/dashboard']);
    
  }

}
