import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/service/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule , RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

    private readonly authService = inject(AuthService);
      private readonly toastrService = inject(ToastrService);
        private readonly router = inject(Router);
      
loginForm:FormGroup = new FormGroup({
    email:new FormControl(null , [Validators.required , Validators.email]),
    password:new FormControl(null , [Validators.required , Validators.pattern(/^[A-Z]\w{7,}$/)] ),
  } );

  submitForm():void{
    if( this.loginForm.valid ){
      this.authService.sendLoginForm(this.loginForm.value).subscribe({
        next:(res)=>{
          if(res.message === 'success'){
            this.toastrService.success(res.message);

            localStorage.setItem('userToken' , res.token);
            
            this.authService.saveUserData();

            this.router.navigate(['/home'])
          }
        }
      })
    }else{
      this.loginForm.markAllAsTouched();
    }
    
  }

}