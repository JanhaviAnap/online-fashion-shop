import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { CartItem } from '../common/cart-item';
import { Order } from '../common/order';
import { Product } from '../common/product';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  cartItems:  CartItem[] = [];
  order: Order = new Order();
  // Subject used to publish events
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();
  emailId :string= String(localStorage.getItem('userEmail'));
  cartId: number = Number(localStorage.getItem('cartId'));  

  baseUrl = 'http://localhost:8080/api'

  constructor(private httpClient: HttpClient,
              private userService: UserService,
              ) { }

  substituteProduct(product: Product): CartItem{
    let cartItem = new CartItem()
    cartItem.userEmail = this.emailId;
    cartItem.cartId = this.cartId;
    cartItem.productId = product.id;
    cartItem.productName = product.name;
    cartItem.productImageUrl = product.imageUrl;
    cartItem.productUnitPrice = product.unitPrice;
    cartItem.productQuantity = 1; 
    return cartItem;
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
  getCartTotals():Observable<any>{
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

  initData(){
    this.getCartItemsByCartId(this.cartId).subscribe(
      data=>{
        this.cartItems=data;
      }
    )
    this.getCartTotals().subscribe(
      data=>{
        this.order = data;
        this.totalPrice.next(this.order.totalPrice);
        this.totalQuantity.next(this.order.totalQuantity);
      }
    )
  }

  checkout(order:Order){
    this.userService.checkout(order).subscribe(
      data=>{
        console.log("order placed: ",order);
        this.order = data; 
        localStorage.setItem('cartId',String(this.order.id))
        this.getOrderByEmail().subscribe(
          data=>{
            this.order=data;
          }
        )
        this.getCartTotals().subscribe(
          data=>{
            this.order = data;
            this.totalPrice.next(this.order.totalPrice);
            this.totalQuantity.next(this.order.totalQuantity);
          }
        )
      }
    )
  }

  logCartData(cartItems: CartItem[],totalPriceValue: number, totalQuantityValue: number) {
    console.log('Contents of the cart');
    for(let tempCartItem of cartItems){
      const subTotalPrice = tempCartItem.productQuantity * tempCartItem.productUnitPrice;
      console.log(`name: ${tempCartItem.productName}, quantity: ${tempCartItem.productQuantity}, unitPrice=${tempCartItem.productUnitPrice}, subTotalPrice= ${subTotalPrice}`);
    }
    console.log(`totalPrice: ${totalPriceValue}, totalQuantity: ${totalQuantityValue}`);
    console.log('---------------------------------------------------------------------');
  }
  
}
