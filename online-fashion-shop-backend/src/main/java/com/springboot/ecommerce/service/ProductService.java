package com.springboot.ecommerce.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.ecommerce.dao.ProductRepository;
import com.springboot.ecommerce.entity.Product;

@Service
public class ProductService {
	
	@Autowired
	private ProductRepository productRepository;
	
	public Product saveProduct(Product product) {
		return productRepository.save(product);
	}
	
	public List<Product> saveProducts(List<Product> products) {
		return productRepository.saveAll(products);
	}
	
	public List<Product> getProducts(){
		return productRepository.findAll();
	}

	public Product getProductById(long id){
		return productRepository.findById(id).orElse(null);
	}
	
	public Product getProductByName(String name){
		return productRepository.findByName(name).orElse(null);
	}
	
	public List<Product> getProductByCategory(long categoryId) {
		return productRepository.findByCategory(categoryId);
	}
	
	public List<Product> getProductByKeyword(String keyword){
		return productRepository.findByKeyword(keyword);
	}
		
	public Product updateProduct(Product product) {
		Product existingProduct = productRepository.findById(product.getId()).orElse(null);
		existingProduct.setName(product.getName());
		existingProduct.setDescription(product.getDescription());
		existingProduct.setImageUrl(product.getImageUrl());
		existingProduct.setUnitPrice(product.getUnitPrice());
		existingProduct.setUnitsInStock(product.getUnitsInStock());
		existingProduct.setCategoryId(product.getCategoryId());
		return productRepository.save(existingProduct);
	}
	
	public Product deleteProduct(long id) {
		Product p = new Product();
		p = getProductById(id);
		productRepository.deleteById(id);
		return p;
	}
	
}
