import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { concat, Observable } from 'rxjs';
import { CartItem } from 'src/app/common/cart-item';
import { Order } from 'src/app/common/order';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] = [];
  order: Order = new Order();
  totalPrice: number = 0;
  totalQuantity: number = 0;
  email :string= String(localStorage.getItem('userEmail'));
  cartId: number = Number(localStorage.getItem('cartId'));
  tempCI: CartItem = new CartItem();
  
  constructor(
    private cartService: CartService,
    private router: Router,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    if(localStorage.getItem('auth')!=="yes"){
      this.router.navigate(['/user/login'])
    }
    this.getOrderByEmail()
    this.listCartItems()
    this.listCartTotals() 
    
    
    
  } 
  listCartItems(){

    this.cartService.getCartItemsByCartId(this.cartId).subscribe(
      data=>{
        this.cartItems=data;
        this.cartService.cartItems=data;
        this.computeCartTotals()
      }
    )
  }


  listCartTotals() {
    // subscribe to the cart totalPrice
    
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    )
    // subscribe to the totalQuantity
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    )
  }

  addCartItem(theCartItem: CartItem){
    // console.log("Adding ",theCartItem)
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = new CartItem();
    if(this.cartItems.length>0){
      for(let tempCartItem of this.cartItems){
        if(tempCartItem.productId===theCartItem.productId){
          existingCartItem = tempCartItem;
          alreadyExistsInCart = true;
          break;
        }
      }
    }
    if(alreadyExistsInCart){
      this.incrementQuantity(existingCartItem);
    }else{
      this.cartService.addCartItem(existingCartItem).subscribe(
        data=>{
          existingCartItem = data;
          console.log("added ", existingCartItem);
          this.listCartItems()
        }
      )
    }
  }

  incrementQuantity(theCartItem: CartItem){
    this.cartService.incrementQuantity(theCartItem).subscribe(
      data =>{
        theCartItem = data;
        console.log("incremented ", theCartItem);
        this.listCartItems()
      }
    );
  }
  updateQuantity(theCartItem: CartItem, value: string){
    let tempVal = Number(value);
    if(tempVal>0){
      theCartItem.productQuantity=tempVal;
      this.cartService.updateQuantity(theCartItem).subscribe(
        data =>{
          theCartItem = data;
          console.log("updated ", theCartItem);
          this.listCartItems()
        }
      )
    }
  }
  decrementQuantity(theCartItem: CartItem){
    
    if(theCartItem.productQuantity===1){
      this.remove(theCartItem)
    }else{
      this.cartService.decrementQuantity(theCartItem).subscribe(
        data =>{
          theCartItem = data;
          console.log("decremented ", theCartItem);
          this.listCartItems()
        }
      ); 
    }
  }
  remove(theCartItem: CartItem){ 
    this.cartService.removeCartItem(theCartItem.id).subscribe(
      data=>{
        let tempCartItem = data
        console.log("deleted succesfully ",tempCartItem)
        this.listCartItems()
      }
    );
  }

  getOrderByEmail(){
    this.cartService.getOrderByEmail().subscribe(
      data=>{
        this.order = data;
        localStorage.removeItem("cartId");
        localStorage.setItem("cartId",String(this.order.id))
      } 
    )
  }

  computeCartTotals(){
    this.cartService.getCartTotals().subscribe(
      data=>{
        this.order = data;
        this.cartService.totalPrice.next(this.order.totalPrice);
        this.cartService.totalQuantity.next(this.order.totalQuantity);
        console.log("order computed==>",this.order)
        this.cartService.logCartData(this.cartItems,this.totalPrice,this.totalQuantity)
      }
    )
  }
  

}

