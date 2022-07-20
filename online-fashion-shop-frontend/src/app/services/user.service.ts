import { HttpClient,HttpHeaders, HttpParams, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { CartItem } from '../common/cart-item';
import { Order } from '../common/order';
import { User } from '../common/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  emailId :string= String(localStorage.getItem('userEmail'));
  cartId: number = Number(localStorage.getItem('cartId'));

  baseUrl = 'http://localhost:8080/api'
  order: Order = new Order();

  constructor(private httpClient: HttpClient) { }

  registerUser(user: User): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/customer/add`,user);
  }
  getUser(emailId: string):Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/customer/byEmail/${emailId}`);
  }
  getCartId(emailId: string): Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/order/getCartId/${emailId}`);
  }
  generateNewOrder(order: Order): Observable<any>{
    return this.httpClient.post(`${this.baseUrl}/order/new`,order)
  }
  getCartItemsByCartId(cartId: number):Observable<any>{
    const searchUrl = `${this.baseUrl}/cart/cartId/${this.emailId}/${cartId}`;
    const searchUrl2 = `${this.baseUrl}/cart/cartId/cust3@gmail.com/4`
    return this.httpClient.get(`${searchUrl}`); 
  }
  getOrderByEmail():Observable<any>{
    const searchUrl = `http://localhost:8080/api/order/getCart/${this.emailId}`;
    return this.httpClient.get(`${searchUrl}`);
  }
  getComputeCartTotals():Observable<any>{
    const searchUrl = `http://localhost:8080/api/order/computeTotals/${this.emailId}`;
    return this.httpClient.get(`${this.baseUrl}/order/computeTotals/${this.emailId}`); 
  }
  getCartItemById(id: number):Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/cart/${id}`);
  }
  addCartItem(cartItem: CartItem):Observable<any>{
    const searchUrl = `http://localhost:8080/api/cart/add`
    return this.httpClient.post(`${searchUrl}`,cartItem)
  }
  incrementQuantity(cartItem: CartItem):Observable<any>{
    return this.httpClient.put(`${this.baseUrl}/cart/incrementQuantity`,cartItem)
  }
  decrementQuantity(cartItem: CartItem):Observable<any>{
    return this.httpClient.put(`${this.baseUrl}/cart/decrementQuantity`,cartItem)
  }
  updateQuantity(cartItem: CartItem):Observable<any>{
    return this.httpClient.put(`${this.baseUrl}/cart/updateQuantity`,cartItem)
  }
  removeCartItem(id: number):Observable<any>{
    return this.httpClient.delete(`${this.baseUrl}/cart/delete/${id}`);
  } 
  checkout(order: Order): Observable<any>{
    return this.httpClient.put(`${this.baseUrl}/order/checkout`,order);
  }


}
