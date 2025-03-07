import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private httpClient:HttpClient) { }


  addProductToWishlist(id:string):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}wishlist`,
      {
        "productId": id
    }
    )
  }

  getLoggedUserWishlist():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}wishlist`)
  }

  RemoveItemFromWishlist(id:string):Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}wishlist/${id}`)
  }


}