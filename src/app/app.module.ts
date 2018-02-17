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
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { RegisterComponent } from './components/register/register.component';


const appRoutes: Routes = [{path:'register',component:RegisterComponent},{path:'explore',component:SearchComponent},{path:'dashboard',component:DashboardComponent},{path:'',component:LoginComponent},{ path: '**', component: LoginComponent }];

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
    MatSliderModule,
    MatSlideToggleModule,
    CollapseModule.forRoot(),
    TabsModule.forRoot(),
    HttpModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
