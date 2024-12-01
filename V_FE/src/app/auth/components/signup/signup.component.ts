import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message'
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-signup',
  standalone: true, 
  imports: [CommonModule, NzSpinModule, NzFormModule, NzButtonModule,ReactiveFormsModule,RouterModule ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  isSpinning: boolean = false;


  signupForm !: FormGroup;

  constructor(private fb: FormBuilder,
    private authService : AuthService,
    private message : NzMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required,this.confirmationValidate]]
    })
  }
  
  //check password
  confirmationValidate = (control : FormControl):{[s: string]: boolean} =>{
    if(!control.value){
      return{ required : true};
    }
    else if(control.value!==this.signupForm.controls['password'].value){
      return {confirm: true, error : true};
    }
    return{};
  };

  register() {
    if (this.signupForm.valid) {
      this.isSpinning = false; // Show spinner
      this.authService.register(this.signupForm.value).subscribe(
        (res) => {
          
          if (res && res.id) { // Check if registration is successful
            this.message.success("Signup Successful", { nzDuration: 5000 });
            this.router.navigateByUrl("/login"); // Redirect to login
          } else {
            this.message.error("Something went wrong", { nzDuration: 5000 });
          }
          this.isSpinning = false; // Stop spinner
        },
        (error) => {
          this.message.error("Registration failed. Please try again.", { nzDuration: 5000 });
          console.error(error);
          this.isSpinning = false; // Stop spinner on error
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
  

}
