import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-my-bookings',
  standalone: false,
  
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.scss'
})
export class MyBookingsComponent {

  bookings:any;
  isSpinning=false;

  constructor(
    private service: CustomerService,
  ){
    this.getMyBookings();
  }

  getMyBookings() {
    this.isSpinning = true;
    this.service.getBookingsByUserId().subscribe((res) => {
      this.isSpinning = false; // Corrected the assignment operator
      this.bookings = res;
      console.log(res);
    }, (err) => {
      this.isSpinning = false;
      console.error('Error fetching bookings:', err);
    });
  }

  getStatusColor(status: string): string {
    if (status === 'APPROVED') {
      return 'green';
    } else if (status === 'REJECTED') {
      return 'red';
    } else {
      return 'black'; // Default color for other statuses
    }
  }

}
