import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-book-car',
  standalone: false,
  
  templateUrl: './book-car.component.html',
  styleUrl: './book-car.component.scss'
})
export class BookCarComponent {
  processedImage: any;
  carId!:number
  validateForm!: FormGroup
  //isSpinning: boolean = false

  constructor(private service: CustomerService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router
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

  bookACar(data: any){
    console.log(data);
  }

}
