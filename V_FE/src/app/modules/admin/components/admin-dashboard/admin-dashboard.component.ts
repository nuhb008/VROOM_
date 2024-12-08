import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {


  cars: any[] = []

  

  constructor(private adminService: AdminService, private message: NzMessageService){}

  ngOnInit(){
    this.getAllCars();
  }

  getAllCars() {
    this.adminService.getAllCars().subscribe(res => {
      console.log(res);
      res.forEach((car: any) => {
        car.processedImg = `data:image/jpeg;base64,${car.returnedImage}`; // Use backticks for string interpolation
        this.cars.push(car);
        console.log('Car Data:', car);
      });
    });
  }

  deleteCar(id: number): void {
    this.adminService.deleteCar(id).subscribe(
      (response) => {
        console.log('Car deleted successfully:', response); // Log the successful response
        this.cars = this.cars.filter(car => car.id !== id); // Update the cars array
        
      },
      (error) => {
        console.error('Error deleting car:', error); // Log any errors that occur
      }
    );
  }
  
  

}
