import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { StorageService } from '../../../../auth/services/storage/storage.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-book-car',
  standalone: false,
  
  templateUrl: './book-car.component.html',
  styleUrl: './book-car.component.scss',
  providers: [DatePipe] 
})
export class BookCarComponent {
  processedImage: any;
  carId!:number
  validateForm!: FormGroup
  dateFormat: string = "YYYY-MM-DD";
  isSpinning: boolean = false

  constructor(private service: CustomerService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router,
    private datePipe: DatePipe
    
  ){}
  car: any;


  ngOnInit() {
    this.validateForm = this.fb.group({
      toDate: [null, Validators.required],
      fromDate: [null, Validators.required]
    })

    this.carId = this.activatedRoute.snapshot.params['id'];

    this.getCarById()
  }





  private getCarById() {
    this.service.getCarById(this.carId).subscribe((res) => {
      console.log(res);
      this.processedImage = `data:image/jpeg;base64,${res.returnedImage}`
      this.car = res
    })
  }

  bookACar(data: any) {
    console.log('Original Input:', data);
  
    // Convert and format the dates
    const fromDate = this.datePipe.transform(new Date(data.fromDate), 'yyyy-MM-dd');
    const toDate = this.datePipe.transform(new Date(data.toDate), 'yyyy-MM-dd');
  
    // Debug the formatted dates
    console.log('Formatted Dates:', { fromDate, toDate });
  
    const bookACarDto = {
      fromDate: fromDate, // 'yyyy-MM-dd'
      toDate: toDate,     // 'yyyy-MM-dd'
      userId: StorageService.getUserId(),
      carId: this.carId,
    };
  
    // Call the API
    this.service.bookACar(bookACarDto).subscribe(
      (res) => {
        this.isSpinning = false;
        this.message.success('Car booked successfully', { nzDuration: 5000 });
        this.router.navigateByUrl('/customer/dashboard');
      },
      (error) => {
        this.isSpinning = false;
        this.message.error('Error occurred while booking the car', { nzDuration: 5000 });
      }
    );
  }
  
  
  
}



