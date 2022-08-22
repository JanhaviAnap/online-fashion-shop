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

import com.springboot.ecommerce.entity.Product;
import com.springboot.ecommerce.service.ProductService;

@RestController
@CrossOrigin(origins="http://localhost:4200")
@RequestMapping("api/")
public class ProductController {
	
	@Autowired
	private ProductService productService;
	
	@PostMapping("addProduct")
	public Product addProduct(@RequestBody Product product) {
		return productService.saveProduct(product);
	}
	
	@PostMapping("addProducts")
	public List<Product> addProducts(@RequestBody List<Product> products) {
		return productService.saveProducts(products);
	}
	
	@GetMapping("products")
	public List<Product> findAllProducts(){
		return this.productService.getProducts();
	}
	
	@GetMapping("products/byId/{id}") 
	public Product getProductById(@PathVariable Long id){
		return this.productService.getProductById(id);
	} 
	@GetMapping("products/byName/{name}")
	public Product getProductByName(@PathVariable String name){
		return this.productService.getProductByName(name);
	}
	
	@GetMapping("products/byCategory/{categoryId}")
	public List<Product> getProductByCategory(@PathVariable long categoryId){
		return this.productService.getProductByCategory(categoryId);
	}
	
	@GetMapping("products/byKeyword/{keyword}")
	public List<Product> getProductByKeyword(@PathVariable String keyword){
		return this.productService.getProductByKeyword(keyword);
	}
	
	@PutMapping("updateProduct")
	public Product updateProduct(@RequestBody Product product) {
		return productService.updateProduct(product);
	}
	
	@DeleteMapping("deleteProduct/{id}")
	public Product deleteProductById(@PathVariable long id) {
		return productService.deleteProduct(id);
	}
}
