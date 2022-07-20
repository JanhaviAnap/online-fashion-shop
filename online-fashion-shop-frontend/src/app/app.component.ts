import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from './services/cart.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // templateUrl: './app.component-copy.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'online-fashion-shop-frontend';
  auth: boolean = false;
  emailId: string = "";
  constructor(private activeRoute: ActivatedRoute,
              private userService: UserService,
              private cartService: CartService  ){}
  ngOnInit() {
    // localStorage.clear()
    // localStorage.setItem('userEmail',"cust6@gmail.com");
    // localStorage.setItem('auth',"no");
    // console.log('heyyyyy'+this.activeRoute);
    localStorage.removeItem("cartId");
    this.cartService.getOrderByEmail();
    // this.cartService.getCartItems();
    // this.cartService.getComputeCartTotals();
    // localStorage.removeItem("cartId");
    // setTimeout(() => {this.ngOnInit() }, 1000 * 1)

  }
  setAuthValid(emailId: string){
    this.auth = true;
    this.emailId = emailId;
  }
  getEmailId():string{
    return this.emailId;
  }
  isLoggedIn(emailId: string): boolean{
    if(emailId===this.emailId){
      return this.auth
    }
    return false;
  }
  logOut(){
    this.auth=false;
    this.emailId = ""
  }
}
  