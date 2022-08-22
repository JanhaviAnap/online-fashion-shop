import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Order } from 'src/app/common/order';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  totalPrice: number = 0;
  totalQuantity: number = 0;
  order: Order = new Order();
  theTotalPrice: Subject<number> = new Subject<number>();
  theTotalQuantity: Subject<number> = new Subject<number>();

  constructor(private router: Router,
              private cartService: CartService,
              private userService: UserService
              ) { }

  doSearch(value: String){
    // console.log(`search value=${value}`);
    this.router.navigateByUrl(`/shop/productByKeyword/${value}`);
  }

  ngOnInit(): void {
    if(localStorage.getItem('auth')!=="yes"){
      this.router.navigate(['/user/login'])
    }
      this.getOrderByEmail();
      this.getComputeCartTotals();
      this.listCartTotals();
  }

  getOrderByEmail(){
    this.userService.getOrderByEmail().subscribe(
      data=>{
        this.order = data;
        localStorage.removeItem("cartId");
        localStorage.setItem("cartId",String(this.order.id))
        this.totalPrice = this.order.totalPrice
        this.totalQuantity = this.order.totalQuantity
        this.theTotalQuantity.next(this.order.totalQuantity);
        this.theTotalPrice.next(this.order.totalPrice);
      }
    )
  }

  listCartTotals() {
    // subscribe for the cart total price and quantity
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
  }
  getComputeCartTotals(){
    this.userService.getComputeCartTotals().subscribe(
      data=>{
        this.order = data;
        this.totalPrice = this.order.totalPrice;
        this.totalQuantity = this.order.totalQuantity;
      }
    )
  }


}
