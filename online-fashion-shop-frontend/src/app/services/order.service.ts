import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  private baseUrl = 'http://localhost:8080/api/order'
  private email = String(localStorage.getItem('userEmail'));
  // private cartId = String(localStorage.getItem('cartId'));
  getPreviousOrders(): Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/getPrevOrders/${this.email}`);
  }

}
