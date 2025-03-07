import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthService } from '../../../core/service/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registeration',
  imports: [ReactiveFormsModule],
  templateUrl: './registeration.component.html',
  styleUrl: './registeration.component.scss'
})
export class RegisterationComponent {
  
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toastrService = inject(ToastrService)

  registerForm:FormGroup = new FormGroup({
    name:new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(20)] ),
    email:new FormControl(null , [Validators.required , Validators.email]),
    password:new FormControl(null , [Validators.required , Validators.pattern(/^[A-Z]\w{7,}$/)] ),
    rePassword:new FormControl(null , [Validators.required]),
    phone:new FormControl(null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)])
  } , {validators: this.confirmPassword } );

  submitForm():void{
    if( this.registerForm.valid ){
      this.authService.sendRegisterForm(this.registerForm.value).subscribe({
        next:(res)=>{
          if(res.message === 'success'){
            this.toastrService.success(res.message)

            this.router.navigate(['/login'])
          }
        }
      })
    }else{
      // this.registerForm?.setErrors({mismatch:true});
      this.registerForm.markAllAsTouched();
    }
    
  }

  confirmPassword( group:AbstractControl ){
    
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;
    
    return password === rePassword ? null : {mismatch:true}
  }

}
