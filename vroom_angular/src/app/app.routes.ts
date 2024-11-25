import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { LoginComponent } from './auth/components/login/login.component'
import { SignupComponent } from './auth/components/signup/signup.component'
import { ReactiveFormsModule } from '@angular/forms'

import { NzMessageModule } from 'ng-zorro-antd/message'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NzSpinModule } from 'ng-zorro-antd/spin'
import { NzFormModule } from 'ng-zorro-antd/form'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzLayoutModule } from 'ng-zorro-antd/layout'
import { NzSelectModule } from 'ng-zorro-antd/select'
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker'
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker'
import { NzUploadModule } from 'ng-zorro-antd/upload'
export const routes: Routes = [
    { path: 'register', component: SignupComponent },
    { path: 'login', component: LoginComponent }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutes{};
