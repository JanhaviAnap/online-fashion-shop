import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/user';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValidators } from 'src/app/validators/form-validators';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Order } from 'src/app/common/order';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: User = new User();
  signUpFormGroup!: FormGroup;
  order: Order = new Order();
  alreadyexists: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private appComponent: AppComponent,
    private router: Router) { }

  ngOnInit(): void {
    this.signUpFormGroup = this.formBuilder.group({
      emailId: new FormControl("",
        [ Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          FormValidators.notOnlyWhiteSpace
        ]
      ),
      userName: new FormControl("",
        [ Validators.required,
          Validators.minLength(2),
          FormValidators.notOnlyWhiteSpace
        ]
      ),
      password: new FormControl("",
      [ Validators.required,
        Validators.minLength(6),
        FormValidators.notOnlyWhiteSpace
      ]
      ),
      confirmPassword:new FormControl("",
      [ Validators.required,
        Validators.minLength(6),
        FormValidators.notOnlyWhiteSpace,
      ]
      ),
    },{
      validator: [FormValidators.confirmPasswordValidator('password','confirmPassword')]
    }); 
  }
  
  get emailId(){return this.signUpFormGroup.get('emailId');}
  get userName(){return this.signUpFormGroup.get('userName');}
  get password(){return this.signUpFormGroup.get('password');}
  get confirmPassword(){return this.signUpFormGroup.get('confirmPassword');}


  onSubmit(){
    if(this.signUpFormGroup.invalid){
      this.signUpFormGroup.markAllAsTouched();
    }else{
      // console.log(this.signUpFormGroup.value);
      this.user.emailId = this.signUpFormGroup.get('emailId')!.value;
      this.order.userEmail = this.signUpFormGroup.get('emailId')!.value;
      this.user.userName = this.signUpFormGroup.get('userName')!.value;
      this.user.password = this.signUpFormGroup.get('password')!.value;
      localStorage.setItem('userEmail',this.user.emailId)
      this.userAlreadyExists();
    }
    
  }
  userAlreadyExists(){
    let tempUser = new User();
    tempUser.id=0;
    this.userService.getUser(this.user.emailId).subscribe(
      data=>{
        tempUser = data
        if(tempUser!==null){
          alert("account with this email already exists!")
          this.router.navigate(['/user/signUp'])
        }
        else{
          this.registerUser();
          this.generateNewOrder();
        }
        
      }
    )
    // return false;
  }
  registerUser(){
    this.userService.registerUser(this.user).subscribe(
      data =>{
        alert("Account created successfully")
        this.router.navigate(['/user/login'])
      }, 
      error => alert("User Not Registered")
    );
  }
  generateNewOrder(){
    this.userService.generateNewOrder(this.order).subscribe(
      data=>{
        this.order = data;
      }
    )
  }
}
