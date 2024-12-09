import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-search-car',
  standalone: false,
  
  templateUrl: './search-car.component.html',
  styleUrl: './search-car.component.scss'
})
export class SearchCarComponent {

  searchCarForm!:FormGroup;
  listOfOption: Array<{ label: string; value: string }> = []
  listOfBrands = ['Toyota', 'Honda', 'BMW', 'Mercedes', 'Audi', 'Lexus']
  listOfType = ['Sports Car', 'Diesel', 'Crossover', 'Luxury Car']
  listOfColor = ['Red', 'Blue', 'Brown', 'Green']
  listOfTransmission = ['Manual', 'Automatic']
  isSpinning = false
  cars: any;
  //service: any;


  constructor(
    private fb:FormBuilder,
    private service:AdminService
  ){
    this.searchCarForm=this.fb.group({
      brand: [null],
      type: [null],
      transmission: [null],
      color: [null]
    })
  }

  ngOnInit(){
    this.searchCar();
  }

  searchCar() {
    this.isSpinning = true;
    
    // Force clear of previous results
    this.cars = [];  
    console.log('Previous search results cleared:', this.cars);
  
    // Start the search request
    this.service.searchCar(this.searchCarForm.value).subscribe(
      res => {
        console.log('Response from API:', res);  // Log the response to verify data structure
        this.isSpinning = false;
  
        // Get the car DTO list
        const carDtoList = res.carDtoList;
  
        if (carDtoList && carDtoList.length > 0) {
          // Map the result to the cars array
          this.cars = carDtoList.map((car: any) => {
            car.processedImage = `data:image/jpeg;base64,${car.returnedImage}`;
            return car;
          });
          console.log('Updated cars array:', this.cars);
        } else {
          console.log("No cars found for the given filters.");
          this.cars = [];  // Ensure cars is cleared if no results
        }
      },
      err => {
        this.isSpinning = false;
        console.error('Error occurred while fetching cars:', err);
      }
    );
  }
  
  
  

}
