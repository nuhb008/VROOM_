import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';

import { NgZorroImportsModule } from '../../NgZorroImportsModule'
//import { BookCarComponent } from './components/book-car/book-car.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookCarComponent } from './components/book-car/book-car.component';
import { RouterModule } from '@angular/router';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';

import en from '@angular/common/locales/en';

import localeZh from '@angular/common/locales/zh';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';

//import { SearchCarComponent } from './components/search-car/search-car.component';
import { SerachCarComponent } from './components/serach-car/serach-car.component';

registerLocaleData(en, 'en');

@NgModule({
  declarations: [
    BookCarComponent,
    MyBookingsComponent,
    
    SerachCarComponent,
    
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    NgZorroImportsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NzDatePickerModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'en-US' }],
})
export class CustomerModule { }
