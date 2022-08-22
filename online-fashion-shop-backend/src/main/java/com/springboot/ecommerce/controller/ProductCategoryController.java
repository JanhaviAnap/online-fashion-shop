package com.springboot.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.ecommerce.entity.ProductCategory;
import com.springboot.ecommerce.service.ProductCategoryService;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("api/")
public class ProductCategoryController {
	
	@Autowired
	private ProductCategoryService productCategoryService;
	
	@PostMapping("addProductCategory")
	public ProductCategory addProductCategory(@RequestBody ProductCategory productCategory) {
		return productCategoryService.saveCategory(productCategory);
	}
	
	@PostMapping("addProductCategories")
	public List<ProductCategory> addProductCategories(@RequestBody List<ProductCategory> productCategories) {
		return productCategoryService.saveCategories(productCategories);
	}
	
	@GetMapping("productCategories")
	public List<ProductCategory> getAllProductCategories(){
		return this.productCategoryService.getProductCategories();
	}
	
	@GetMapping("productCategories/byId/{id}")
	public ProductCategory getProductByCategoryId(@PathVariable Long id){
		return this.productCategoryService.getProductCategoryById(id);
	}
	
	@GetMapping("productCategories/byName/{name}")
	public ProductCategory getProductCategoryByName(@PathVariable String name) {
		return this.productCategoryService.getProductCategoryByName(name);
	}

	@GetMapping("productCategories/byType/{type}")
	public List<ProductCategory> getProductCategoryByType(@PathVariable String type){
		return this.productCategoryService.getProductCategoryByType(type);
	}
	
	@GetMapping("productCategories/byPid/{pid}")
	public ProductCategory getProductCategoryByProductId(@PathVariable long pid) {
		return this.productCategoryService.getProductCategoryByProductId(pid);
	}
	
	@PutMapping("updateProductCategory")
	public ProductCategory updateProductCategory(@RequestBody ProductCategory productCategory) {
		return this.productCategoryService.updateProductCategory(productCategory);
	}
	
	@DeleteMapping("deleteProductCategory/{id}")
	public ProductCategory deleteProductCategory(@PathVariable long id) {
		return this.productCategoryService.deleteProductCategory(id);
	}
}
