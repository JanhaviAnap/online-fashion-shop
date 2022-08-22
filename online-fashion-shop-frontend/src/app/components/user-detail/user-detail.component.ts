import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { User } from 'src/app/common/user';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/common/order';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'] 
})
export class UserDetailComponent implements OnInit {

  constructor(
    private appComponent: AppComponent,
    private router: Router,
    private cartService: CartService,
    private userService: UserService,
    private orderService: OrderService
    ) { }

  order: Order = new Order(); 
  user: User = new User();
  orderList: Order[] = [];
  emailId :string= String(localStorage.getItem('userEmail'));

  ngOnInit(): void {
    // location.reload()
    if(localStorage.getItem('auth')!=="yes"){
      console.log("from user detail comp")
      this.router.navigate(['/user/login'])
    }
      // cust7@gmail.com
    this.getUser();
    this.getPreviousOrders();
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

  getUser(){
    this.userService.getUser(this.emailId).subscribe(
      data=>{
        this.user = data;
      }
    )
  }

  getPreviousOrders(){
    this.orderService.getPreviousOrders().subscribe(
      data=>{
        this.orderList = data;
      }
    )
  }

  logOut(){
    // this.appComponent.logOut()
    // localStorage.removeItem("auth")
    // localStorage.removeItem("cartId")
    let tempMail = String(localStorage.getItem("userEmail"))
    localStorage.clear();
    this.cartService.totalQuantity.next(0);
    this.cartService.totalPrice.next(0);
    // localStorage.setItem("userEmail",tempMail)
    // if(localStorage.getItem('auth')!=="yes"){
    //   // window.location.reload();
    //   this.router.navigate(['/user/login'])
    // }
    console.log("from logout")
    // location.reload();
    this.router.navigate(['/user/login']) 
  } 
} 
