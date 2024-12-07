import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { FormBuilder, Validators } from '@angular/forms'
import { AdminService } from '../../services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
@Component({
  selector: 'app-post-car',
  standalone: false,
  
  templateUrl: './post-car.component.html',
  styleUrls: ['./post-car.component.scss']
})
export class PostCarComponent {

  postCarForm !: FormGroup;
  isSpinning: boolean = false;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  listOfOption: Array<{ label: string; value: string }> = [];
  listOfBrands = ['Toyota', 'Honda', 'BMW', 'Mercedes', 'Audi', 'Lexus'];
  listOfType = ['Sports Car', 'Diesel', 'Crossover', 'Luxury Car'];
  listOfColor :string[]= ['Red', 'Blue', 'Brown', 'Green'];
  listOfTransmission = ['Manual', 'Automatic'];

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private message: NzMessageService,
    private router: Router
  ) {}
  ngOnInit() {
    this.postCarForm = this.fb.group({
      name: [null, Validators.required],
      brand: [null, Validators.required],
      type: [null, Validators.required],
      color: [null, Validators.required],
      transmission: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
      year: [null, Validators.required]
    })
  }
  postCar() {
    console.log(this.postCarForm.value);
    this.isSpinning=true;

    const formData: FormData = new FormData()
    formData.append('image', this.selectedFile as Blob)
    formData.append('brand', this.postCarForm.value.brand)
    formData.append('name', this.postCarForm.value.name)
    formData.append('type', this.postCarForm.value.type)
    formData.append('color', this.postCarForm.value.color)
    formData.append('year', this.postCarForm.value.year)
    formData.append('transmission', this.postCarForm.value.transmission)
    formData.append('description', this.postCarForm.value.description)
    formData.append('price', this.postCarForm.value.price)
    console.log(formData);
    this.adminService.postCar(formData).subscribe(res=>{
      this.isSpinning=false;
      this.message.success("Car posted successfully",{nzDuration:5000});
      this.router.navigateByUrl("/admin/dashboard");
      console.log(res);
    },error=>{
      this.isSpinning = false;
      this.message.error("Error while posting car",{nzDuration:5000})
    })
  }
  
    onFileSelected($event: Event) {
      const target = $event.target as HTMLInputElement
      this.selectedFile = (target.files as FileList)[0]
  
      this.previewImage()
    }
  
    previewImage() {
      const reader = new FileReader()
      reader.onload = () => {
        this.imagePreview = reader.result
      }
      reader.readAsDataURL(this.selectedFile as Blob)
    }
 

}
