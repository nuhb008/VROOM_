import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message'
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
@Component({
  selector: 'app-signup',
  standalone: true, 
  imports: [CommonModule, NzSpinModule, NzFormModule, NzButtonModule,ReactiveFormsModule ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  isSpinning: boolean = false;


  signupForm !: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required]]
    })
  }

  register() {
    if (this.signupForm.valid) {
      this.isSpinning = true;
      console.log(this.signupForm.value); // Replace with actual API call
      this.isSpinning = false;
    } else {
      console.error('Form is invalid');
    }
  }

}
