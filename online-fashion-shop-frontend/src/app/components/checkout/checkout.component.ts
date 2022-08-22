import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from 'src/app/common/order';
import { CartService } from 'src/app/services/cart.service';
import { FormService } from 'src/app/services/form.service';
import { UserService } from 'src/app/services/user.service';
import { FormValidators } from 'src/app/validators/form-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;
  cardYears: number[]=[];
  cardMonths: number[]=[];

  private order: Order = new Order();
  private emailId :string= String(localStorage.getItem('userEmail'));
  private cartId: number = Number(localStorage.getItem('cartId'));


  constructor(private formBuilder: FormBuilder,
              private formService: FormService,
              private router: Router,
              private userService: UserService,
              private cartService: CartService
              ) { }

  ngOnInit(): void {
    if(localStorage.getItem('auth')!=="yes"){
      this.router.navigate(['/user/login'])
    }
    
    this.getOrderByEmail();
    this.checkoutFormGroup = this.formBuilder.group({
      shippingAddress: this.formBuilder.group({
        fullName: new FormControl('',
          [ Validators.required,
            Validators.minLength(2),
            FormValidators.notOnlyWhiteSpace
          ]
        ),
        email: new FormControl('',
          [ Validators.required,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
            FormValidators.notOnlyWhiteSpace
          ]
        ),
        address: new FormControl('',
          [ Validators.required,
            Validators.minLength(2),
            FormValidators.notOnlyWhiteSpace
          ]
        ),
        city: new FormControl('',
          [ Validators.required,
            Validators.minLength(2),
            FormValidators.notOnlyWhiteSpace
          ]
        ),
        state: new FormControl('',
          [ Validators.required,
            Validators.minLength(2),
            FormValidators.notOnlyWhiteSpace
          ]
        ),
        pincode: new FormControl('',
        [ Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6),
          FormValidators.notOnlyWhiteSpace
        ]
      )
      }),
      paymentDetails: this.formBuilder.group({
        nameOnCard: new FormControl('',
          [ Validators.required,
            Validators.minLength(2),
            FormValidators.notOnlyWhiteSpace
          ]
        ),
        cardNumber: new FormControl('',
          [ Validators.required,
            Validators.pattern('[0-9]{16}'),
            FormValidators.notOnlyWhiteSpace
          ]
        ),
        expMonth: [''],
        expYear: [''],
        cvv: new FormControl('',
          [ Validators.required,
            Validators.pattern('[0-9]{3}'),
            FormValidators.notOnlyWhiteSpace
          ]
        )
      })
    });
    // populate card months
    const startMonth: number = new Date().getMonth()+1;
    this.formService.getCardMonths(startMonth).subscribe(
      data=>{
        this.cardMonths = data;
      }
    );
    // populate card years
    this.formService.getCardYears().subscribe(
      data=>{
        this.cardYears = data;
      }
    );
    
  }

  get fullName(){return this.checkoutFormGroup.get('shippingAddress.fullName');}
  get email(){return this.checkoutFormGroup.get('shippingAddress.email');}
  get address(){return this.checkoutFormGroup.get('shippingAddress.address');}
  get city(){return this.checkoutFormGroup.get('shippingAddress.city');}
  get state(){return this.checkoutFormGroup.get('shippingAddress.state');}
  get pincode(){return this.checkoutFormGroup.get('shippingAddress.pincode');}
  
  get nameOnCard(){return this.checkoutFormGroup.get('paymentDetails.nameOnCard');}
  get cardNumber(){return this.checkoutFormGroup.get('paymentDetails.cardNumber');}
  get expMonth(){return this.checkoutFormGroup.get('paymentDetails.expMonth');}
  get expYear(){return this.checkoutFormGroup.get('paymentDetails.expYear');}
  get cvv(){return this.checkoutFormGroup.get('paymentDetails.cvv');}


  handleMonthsAndYears(){
    const cardFormGroup = this.checkoutFormGroup.get('paymentDetails');
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(cardFormGroup!.value.expYear);

    let startMonth: number;
    if(currentYear==selectedYear){
      startMonth = new Date().getMonth()+1;
    }else{
      startMonth = 1;
    }
    this.formService.getCardMonths(startMonth).subscribe(
      data=>{
        this.cardMonths = data;
      }
    );
  }

  onSubmit(){
    if(this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
    }
    const shippingAddress = this.checkoutFormGroup.get('shippingAddress');
    const paymentDetails = this.checkoutFormGroup.get('paymentDetails');
    // console.log("Shipping Address: "+this.checkoutFormGroup.get('shippingAddress')?.value);
    // console.log("payment Details: "+this.checkoutFormGroup.get('paymentDetails')?.value);
    this.order.name = String(shippingAddress!.value.fullName)
    this.order.email = String(shippingAddress!.value.email)
    this.order.address = String(shippingAddress!.value.address)
    this.order.city = String(shippingAddress!.value.city)
    this.order.state = String(shippingAddress!.value.state)
    this.order.pincode = Number(shippingAddress!.value.pincode)
    
    this.cartService.checkout(this.order);
    window.location.reload();
    this.router.navigate(['/shop/products']).then(()=>{
      alert("Payment Successful!!")
      window.location.reload();
    })
    
  }

  getOrderByEmail(){
    this.cartService.getOrderByEmail().subscribe(
      data=>{
        this.order = data;
      }
    )
  }

}
