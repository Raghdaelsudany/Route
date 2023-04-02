import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  constructor(private HttpClient:HttpClient,private router:Router) {}

  getProduct():Observable<any>{
    return this.HttpClient.get(`https://route-ecommerce.onrender.com/api/v1/products`);
  }

  getProductDetails(id:string):Observable<any>{
    return this.HttpClient.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`);
  }

  getCategories():Observable<any>{
    return this.HttpClient.get(`https://route-ecommerce.onrender.com/api/v1/categories`);
  }
}
