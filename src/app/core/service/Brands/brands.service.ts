import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private httpClient:HttpClient) { }

  getAllBrands():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}brands`)
  }

  getSpecificBrand(id:string):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}brands/${id}`)
  }

}
