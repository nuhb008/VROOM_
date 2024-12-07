import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { PostCarComponent } from './components/post-car/post-car.component';
import { NgZorroImportsModule } from '../../NgZorroImportsModule';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';


@NgModule({
  declarations: [
    PostCarComponent,
    //AdminDashboardComponent
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgZorroImportsModule,
    ReactiveFormsModule
  ],
  //exports: [AdminDashboardComponent],
})
export class AdminModule { }
