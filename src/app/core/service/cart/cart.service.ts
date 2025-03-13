import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../shared/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient:HttpClient) { }
  
  // cartNumber : BehaviorSubject<number> = new BehaviorSubject(0);
  cartNumber : WritableSignal<number> = signal(0);

  addProductToCart(id:string):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}cart` ,
      {
        "productId": id
    }
    )
  }

  getLoggedUserCart():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}cart`)
  }

  removeSpecificCartItem(id:string):Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}cart/${id}`)
  }

  updateCartQuantity(id:string , newCount:number):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}cart/${id}`,
      {
        "count": newCount
    }
    )
  }

  clearCart():Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}cart`)
  }

}
