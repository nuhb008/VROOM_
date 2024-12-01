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
import { StorageService } from '../../services/storage/storage.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, NzSpinModule, NzFormModule, NzButtonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isSpinning : boolean=false;
  loginForm!: FormGroup;
   constructor(private fb: FormBuilder,
    private authService : AuthService,
    private message : NzMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]]
    })
  }

   login(): void {
    console.log('Login form submitted:', this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe((res) => {
      console.log(res);
      if(res.userId!=null){
        const user ={
          id: res.userId,
          role: res.userRole
        }
      
      StorageService.saveUser(user);
      StorageService.saveToken(res.jwt);
      if(StorageService.isAdminLoggedIn()){
        this.router.navigateByUrl("/admin/dashboard");

      }
      else if(StorageService.isCustomerLoggedIn()){
        this.router.navigateByUrl("/customer/dashboard");
      }
      else{
        this.message.error("Bad credentials",{nzDuration: 5000});
      }

    }

   })
   }  
    

}
