import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/common/user';
import { UserService } from 'src/app/services/user.service';
import { FormValidators } from 'src/app/validators/form-validators';
import { AppComponent } from 'src/app/app.component';
import { Order } from 'src/app/common/order';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  tempMail: string = String(localStorage.getItem('userEmail'))
  loginUser: User = new User(); 
  dbUser: User = new User();
  loginFormGroup!: FormGroup;
  order: Order = new Order();
  

  constructor(
    private formBuiler: FormBuilder,
    private router: Router,
    private userService: UserService,
    private appComponent: AppComponent,
    private cartService: CartService
  ) { }
 
  ngOnInit(): void {
    // this.tempMail = String(localStorage.getItem('userEmail'))
    // console.log(this.tempMail)
    this.loginFormGroup = this.formBuiler.group({
      emailId: new FormControl("",
        [ Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          FormValidators.notOnlyWhiteSpace
        ]
      ),
      password: new FormControl("",
      [ Validators.required,
        Validators.minLength(6),
        FormValidators.notOnlyWhiteSpace
      ]
      )
    })
    // this.getCartId();
  }
  get emailId(){return this.loginFormGroup.get('emailId');}
  get password(){return this.loginFormGroup.get('password');}

  onSubmit(){
    if(this.loginFormGroup.invalid){
      this.loginFormGroup.markAllAsTouched();
    }else{
      console.log(this.loginFormGroup.value);
      console.log("loginPressed");
      this.loginUser.emailId = this.loginFormGroup.get('emailId')!.value;
      this.order.userEmail = this.loginFormGroup.get('emailId')!.value;
      this.loginUser.password = this.loginFormGroup.get('password')!.value;
      this.validateUser(this.loginUser);
      if(String(localStorage.getItem('auth'))==="yes"){
      // if(this.appComponent.isLoggedIn(this.loginUser.emailId)){
        window.location.reload();
        console.log("successful attempt by ", this.appComponent.getEmailId())
        this.cartService.getOrderByEmail();
        localStorage.setItem('cartId',String(this.order.id))
        // this.cartService.getCartItems() 
        // this.cartService.getComputeCartTotals()
        
      }else{
        console.log("unsuccessful attempt")
        console.log("from login component")
        this.router.navigate(['/user/login'])
      }
    }
  }

  validateUser(inputUser: User){
    this.userAlreadyExists(inputUser)
    this.userService.getUser(inputUser.emailId).subscribe(
      data => {
        // console.log("Blah blah Status: ",data.httpStatus)
        this.dbUser=data;
        if(inputUser.password===this.dbUser.password){
          localStorage.setItem('userEmail',inputUser.emailId);
          localStorage.setItem('auth',"yes");
          this.getCartId()
          
          console.log("success from login")
          
          this.router.navigate(['/shop/products']).then(()=>{
            location.reload();
          })
          // location.reload();
          // this.cartService.computeCartTotals();
        }
      }
    );
    // location.reload();
  }

  userAlreadyExists(user: User){
    // console.log(this.user);
    let tempUser = new User();
    tempUser.id=0;
    this.userService.getUser(user.emailId).subscribe(
      data=>{
        tempUser = data
        if(tempUser===null){
          alert("account does not exists!");
          this.router.navigate(['/user/login'])
        }
        
      }
    )
    // return false;
  }

  getCartId(){
    this.userService.getCartId(this.order.userEmail).subscribe(
      data=>{
        this.order.id = data;
        localStorage.setItem('cartId',String(this.order.id))
        console.log("orderrrrrrrrrrrid ,",this.order.id)
      }
    )
  }
  // getCartItems(){
  //   const email = String(localStorage.getItem("userEmail"));
  //   const cartId = Number(localStorage.getItem("cartId"));
  //   this.userService.getCartItemsByCartId(email,cartId).subscribe(
  //     data=>{
  //       this.cartService.cartItems = data;
  //     }
  //   );
  // }

}
