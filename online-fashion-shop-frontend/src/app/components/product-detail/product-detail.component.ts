import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Order } from 'src/app/common/order';
import { Product } from 'src/app/common/product';
import { ProductCategory } from 'src/app/common/product-category';
import { CartService } from 'src/app/services/cart.service';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  // category : ProductCategory = {
  //   id:0,
  //   category:"",
  //   type:""
  // }
  emailId :string= String(localStorage.getItem('userEmail'));
  cartId: number = Number(localStorage.getItem('cartId'));
  order: Order = new Order();
  totalPrice: number = 0;
  totalQuantity: number = 0;
  cartItems: CartItem[] = [];
  category: ProductCategory = new ProductCategory();
  prod: Product = new Product();
  constructor(
              private productService:ProductService,
              private productCategoryService:ProductCategoryService,
              private cartService: CartService,
              private route: ActivatedRoute,
              private router: Router
  ){}

  ngOnInit(): void {
    if(localStorage.getItem('auth')!=="yes"){
      console.log("from prod detail comp")
      this.router.navigate(['/user/login'])
    }
      this.route.paramMap.subscribe(()=>{
        this.listCartItems();
        this.handleProductDetails();
      })
    
    // this.route.paramMap.subscribe(()=>{
    //   this.listCartItems();
    //   this.handleProductDetails();
    // })
  }
  handleProductDetails() {
    const theProductId: number = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProduct(theProductId).subscribe(
      data => {
        this.prod = data;
        console.log(`Searched product `+JSON.stringify(data));
      }
    );
    this.productCategoryService.getProductCategoryByPid(theProductId).subscribe(
      (data) => {
        this.category = data;
      }
    );
  }
  addToCart(){
    // let theProduct = this.prod
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = new CartItem();
    if(this.cartItems.length>0){
      for(let tempCartItem of this.cartItems){
        if(tempCartItem.productId===this.prod.id){
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
      let theCartItem = new CartItem();
      theCartItem = this.cartService.substituteProduct(this.prod);
      this.cartService.addCartItem(theCartItem).subscribe(
        data=>{
          theCartItem = data;
          console.log("added ", theCartItem);
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
        console.log("order hmm computed==>",this.order)
        this.cartService.logCartData(this.cartItems,this.totalPrice,this.totalQuantity)
      }
    )
  }
}
