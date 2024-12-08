import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';

import { NgZorroImportsModule } from '../../NgZorroImportsModule'
//import { BookCarComponent } from './components/book-car/book-car.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookCarComponent } from './components/book-car/book-car.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    BookCarComponent,
    //CustomerDashboardComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    NgZorroImportsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class CustomerModule { }
