import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductCategoryService } from 'src/app/services/product-category.service'

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  productCategories: ProductCategory[]=[];
  currentCategoryId: number = 0;
  // currentCategoryName: string = "any";

  
  // constructor(private productService: ProductService,
  //             private route: ActivatedRoute) { }
  constructor(
    private productCategoryService: ProductCategoryService,
    private router: Router 
    ) { }
  
  // ngOnInit(): void {
  //   this.route.paramMap.subscribe(()=>{
  //     this.listProducts();
  //   });
  // }
  ngOnInit(): void { 
    if(localStorage.getItem('auth')!=="yes"){
      console.log("from cat list component")
      this.router.navigate(['/user/login'])
    }

    this.listProductCategories();
    
  }
 
  listProductCategories(){
    this.productCategoryService.getProductCategoryList().subscribe(
      data =>{
        console.log('Product Categories='+JSON.stringify(data));
        this.productCategories = data;
      }
    )
  }

}
