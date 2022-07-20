import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Order } from 'src/app/common/order';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { CartComponent } from '../cart/cart.component';

@Component({ 
  selector: 'app-product-list',
  templateUrl: './product-list.component-copy.html',
  styleUrls: ['./product-list.component.css',
              './css/header.css',
              './css/content.css'
            ]
}) 
export class ProductListComponent implements OnInit {

  emailId :string= String(localStorage.getItem('userEmail'));
  cartId: number = Number(localStorage.getItem('cartId'));
  order: Order = new Order();
  totalPrice: number = 0;
  totalQuantity: number = 0;
  cartItems: CartItem[] = [];
  products: Product[]=[];
  currentCategoryId: number = 0;
  currentCategoryName: string = "all";
  searchMode: boolean = true;
  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute,
              private router: Router
              ) { }  
  ngOnInit(): void {
    if(localStorage.getItem('auth')!=="yes"){
      console.log("from product list component")
      this.router.navigate(['/user/login']) 
    }
      this.route.paramMap.subscribe(()=>{
        this.listCartItems();
        this.listProducts();
      });
    
    
  }

 
  listProducts(){ 
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode){
      this.handleSearchProducts();
    }else{
      this.handleListProducts();
    }
    this.computeCartTotals()
    
  }

  handleSearchProducts(){
    const theKeyword: string = String(this.route.snapshot.paramMap.get('keyword'));
    this.productService.searchProducts(theKeyword).subscribe(
      data => {
        console.log(`Searched by keyword = ${theKeyword}`);
        this.products = data;
      }
    )

  }

  handleListProducts(){
    //check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('catid');
    const theKeyword: string = String(this.route.snapshot.paramMap.get('keyword'));
    if (hasCategoryId && Number(this.route.snapshot.paramMap.get('catid'))>0){
      //get the "id" param string. convert str to a number using the + symbol
      this.currentCategoryId = Number(this.route.snapshot.paramMap.get('catid'));
      this.currentCategoryName = String(this.route.snapshot.paramMap.get('name'));
    } 
    else{ 
      this.currentCategoryName = "all";
      this.productService.getProductList().subscribe(
        data => {
          this.products = data;
        }
      )
    }
    this.productService.getProductByCategoryList(this.currentCategoryId).subscribe(
      data=>{
        if(this.currentCategoryId!==0){
          console.log(`Products By Category = ${this.currentCategoryId}`);
        }
        this.products=data;
      }
    )
    

  }
  addToCart(theProduct: Product){
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = new CartItem();
    if(this.cartItems.length>0){
      for(let tempCartItem of this.cartItems){
        if(tempCartItem.productId===theProduct.id){
          existingCartItem = tempCartItem;
          alreadyExistsInCart = true;
          break;
        }
      }
    }
    if(alreadyExistsInCart){
      this.cartService.incrementQuantity(existingCartItem).subscribe(
        data=>{
          existingCartItem = data;
          console.log("incremented ", existingCartItem);
          this.listCartItems()
        }
      )
    }else{
      
      existingCartItem = this.cartService.substituteProduct(theProduct);
      this.cartService.addCartItem(existingCartItem).subscribe(
        data=>{
          existingCartItem = data;
          console.log("added ", existingCartItem);
          this.listCartItems()
        }
      )
    }
  }
  listCartItems(){
    this.cartService.getCartItemsByCartId(this.cartId).subscribe(
      data=>{
        this.cartItems=data;
      }
    )
    this.computeCartTotals()
  }
  computeCartTotals(){
    this.cartService.getCartTotals().subscribe(
      data=>{
        this.order = data;
        this.cartService.totalPrice.next(this.order.totalPrice);
        this.cartService.totalQuantity.next(this.order.totalQuantity);
      }
    )
  }

} 
