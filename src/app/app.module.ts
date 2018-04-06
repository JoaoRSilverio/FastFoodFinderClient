import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HttpModule} from '@angular/http';
import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DataService } from './services/data.service';
import { MyproductsComponent } from './components/myproducts/myproducts.component';
import { LocationsComponent } from './components/locations/locations.component';
import { AddComponent } from './components/add/add.component';
import {MatSliderModule} from '@angular/material/slider';
import {MatInputModule} from '@angular/material/input';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import {MatSlideToggleModule,MatSlideToggleChange} from '@angular/material/slide-toggle';
import { RegisterComponent } from './components/register/register.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import{BrowserAnimationsModule} from '@angular/platform-browser/animations';

const appRoutes: Routes = [{path:"login" ,component:LoginComponent},{path:'register',component:RegisterComponent},{path:'explore',redirectTo:"/dashboard/explore",pathMatch: 'prefix'},{path:'dashboard/:action?',component:DashboardComponent},{path:'dashboard',component:DashboardComponent},{path:'',redirectTo:"/login",pathMatch: 'prefix'},{path:'**',redirectTo:"/dashboard",pathMatch: 'prefix'}];
//{path:'',redirectTo:"/login",pathMatch: 'prefix'},{path:'**',redirectTo:"/login",pathMatch: 'prefix'}
@NgModule({
  declarations: [
    
    AppComponent,
    SearchComponent,
    LoginComponent,
    DashboardComponent,
    MyproductsComponent,
    LocationsComponent,
    AddComponent,
    RegisterComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSliderModule,
    MatSlideToggleModule,
    CollapseModule.forRoot(),
    TabsModule.forRoot(),
    HttpModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    BrowserModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
