import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient:HttpClient){ }

getAllCategories():Observable<any>{
  return this.httpClient.get(`${environment.baseUrl}categories`)
}

getSpecificCategories(id:string):Observable<any>{
  return this.httpClient.get(`${environment.baseUrl}categories/${id}`)
}

}