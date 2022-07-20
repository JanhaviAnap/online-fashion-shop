import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  constructor(
    private router: Router,
    private appComponent: AppComponent,
    private cartService: CartService
    ) { }

  ngOnInit(): void {
    if(localStorage.getItem('auth')!=="yes"){
      this.router.navigate(['/user/login']) 
    }
  }

}
