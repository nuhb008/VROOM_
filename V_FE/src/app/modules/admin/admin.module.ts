import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { PostCarComponent } from './components/post-car/post-car.component';
import { NgZorroImportsModule } from '../../NgZorroImportsModule';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UpdateCarComponent } from './components/update-car/update-car.component';
import { RouterModule } from '@angular/router';
import { GetBookingsComponent } from './components/get-bookings/get-bookings.component';
import { SearchCarComponent } from './components/search-car/search-car.component';
//import { SerachCarComponent } from './components/serach-car/serach-car.component';


@NgModule({
  declarations: [
    PostCarComponent,
    UpdateCarComponent,
    GetBookingsComponent,
    SearchCarComponent,
    
   
    //AdminDashboardComponent
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgZorroImportsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  //exports: [AdminDashboardComponent],
})
export class AdminModule { }
