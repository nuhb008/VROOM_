import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-get-bookings',
  standalone: false,
  
  templateUrl: './get-bookings.component.html',
  styleUrl: './get-bookings.component.scss'
})
export class GetBookingsComponent {

  isSpinning = false;
  bookings:any;

  constructor(
    private adminService: AdminService,
    private message: NzMessageService
  ){

  }

  ngOnInit() {
    this.getBookings()
  }

  changeBookingStatus(bookingId: number, status: string) {
    console.log(bookingId,status);
    this.adminService.changeBookingStatus(bookingId, status).subscribe(
      () => {
        this.getBookings()

        this.message.success('Booking status changed successfully')
      },
      error => {
        this.message.error('Error changing booking status')
      }
    )
  }

  private getBookings() {
    this.isSpinning = true

    this.adminService.getCarBookings().subscribe(res => {
      console.log(res)
      this.bookings = res

      this.isSpinning = false
    })
  }
  

}
