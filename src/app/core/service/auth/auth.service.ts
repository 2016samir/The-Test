import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/environment/environment';
import { jwtDecode } from "jwt-decode";
import { Itoken } from '../../../shared/interface/Token/itoken';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }

  private readonly router = inject(Router)

  // userData:Itoken = {} as Itoken;
  userData:any;

  sendRegisterForm(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}auth/signup`, data)
  }

  sendLoginForm(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}auth/signin`, data)
  }

  saveUserData():void{
    if(localStorage.getItem('userToken') !== null){
      this.userData = jwtDecode( localStorage.getItem('userToken')! );
      // console.log('userData' , this.userData);
      
    }
  }

  logOut():void{
    localStorage.removeItem('userToken');
    // this.userData = { } as Itoken;
    this.userData = null;
    this.router.navigate(['/login']);
  }


  // Reset Password
  setEmailVerify(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}auth/forgotPasswords`, data )
  }


  setCodeVerify(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}auth/verifyResetCode`, data )
  }

  setResetPassword(data:object):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}auth/resetPassword`, data )
  }

}


