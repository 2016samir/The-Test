import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient:HttpClient) { }

  checkOutPayment(id:string , data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}orders/checkout-session/${id}?url=http://localhost:4200` ,
      {
        "shippingAddress": data
    }
    )
  }

  getAllUserOrders(id:string):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}orders/user/${id}`)
  }
}
