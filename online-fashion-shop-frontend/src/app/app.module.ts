import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ShopComponent } from './components/shop/shop.component';
import { HeaderComponent } from './components/header/header.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { Routes, RouterModule } from '@angular/router';
import { ProductCategoryService } from './services/product-category.service';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { CartService } from './services/cart.service';
import { FormService } from './services/form.service';
import { UserService } from './services/user.service';
import { OrderService } from './services/order.service';

const routes: Routes = [
  {path: 'cart',
    children:[
      {path: 'details', component: CartComponent},
      {path: 'checkout', component: CheckoutComponent}
    ]
  },
  {path: 'shop', component: ShopComponent,
    children:[
      {path: 'products/:id', component :ProductDetailComponent},
      {path: 'productByKeyword/:keyword', component :ProductListComponent},
      {path: 'productByCategory/:catid/:name', component :ProductListComponent},
      {path: 'productByCategory/:catid', component :ProductListComponent},
      {path: 'products', component :ProductListComponent},
      {path: '', redirectTo:'/shop/products', pathMatch:'full'}
    ]
  },
  {path: 'user',
    children:[
      {path: 'login', component :LoginComponent},
      {path: 'signUp', component :SignupComponent},
      {path: 'detail', component: UserDetailComponent}
    ]
  },
  {path: '', redirectTo :'/shop/products',pathMatch:'full'},
  {path: '**', redirectTo :'/shop/products',pathMatch:'full'}
];
 

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    CategoryListComponent,
    ProductDetailComponent,
    ShopComponent,
    HeaderComponent,
    CartComponent,
    CheckoutComponent,
    LoginComponent,
    SignupComponent,
    UserDetailComponent
  ], 
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule 
  ],
  providers: [
    ProductService,
    ProductCategoryService,
    CartService,
    FormService,
    UserService,
    OrderService
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
