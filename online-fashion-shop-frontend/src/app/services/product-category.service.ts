import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ProductCategory } from '../common/product-category';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  private categoryUrl = 'http://localhost:8080/api/productCategories';
  constructor(private httpClient: HttpClient) { }

  getProductCategoryList(): Observable<any>{
    return this.httpClient.get(`${this.categoryUrl}`);
  }
  getProductCategory(theProductCategoryId: number): Observable<any>{
    const searchUrl = `${this.categoryUrl}/byId/${theProductCategoryId}`;
    return this.httpClient.get(`${searchUrl}`);
  }
  getProductCategoryByPid(theProductId: number): Observable<any>{
    const searchUrl = `${this.categoryUrl}/byPid/${theProductId}`;
    return this.httpClient.get(`${searchUrl}`);
  }

}
