import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Product } from '../common/product';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
}) 
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products'


  constructor(private httpClient: HttpClient) { }

  // getProductList(): Observable<Product[]>{
  //   return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
  //     map(response=>response._embedded.products)
  //   );
  // }
  // getProductList(theCategoryId: number): Observable<any>{
  //   const searchUrl = `${this.baseUrl}/byCategory/${theCategoryId}`
  //   return this.httpClient.get(`${searchUrl}`);
  // }
  getProductList(): Observable<any>{
    return this.httpClient.get(`${this.baseUrl}`);
  }
  getProductByCategoryList(theCategoryId: number): Observable<any>{
    if(theCategoryId==0){
      return this.httpClient.get(`${this.baseUrl}`);
    }
    const searchUrl = `${this.baseUrl}/byCategory/${theCategoryId}`;
    return this.httpClient.get(`${searchUrl}`);
  }
  searchProducts(theKeyword: string): Observable<any> {
    const searchUrl = `${this.baseUrl}/byKeyword/${theKeyword}`;
    return this.httpClient.get(`${searchUrl}`);
  }
  getProduct(theProductId: number): Observable<any>{
    const searchUrl = `${this.baseUrl}/byId/${theProductId}`;
    return this.httpClient.get(`${searchUrl}`);
  }
}  
 
