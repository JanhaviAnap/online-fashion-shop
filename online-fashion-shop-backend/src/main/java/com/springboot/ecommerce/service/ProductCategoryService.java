package com.springboot.ecommerce.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.ecommerce.dao.ProductCategoryRepository;
import com.springboot.ecommerce.entity.ProductCategory;

@Service
public class ProductCategoryService {

	@Autowired
	private ProductCategoryRepository productCategoryRepository;
	
	public ProductCategory saveCategory(ProductCategory productCategory) {
		return productCategoryRepository.save(productCategory);
	}
	
	public List<ProductCategory> saveCategories(List<ProductCategory> productCategories) {
		return productCategoryRepository.saveAll(productCategories);
	}
	
	public List<ProductCategory> getProductCategories(){
		return productCategoryRepository.findAll();
	}
	
	public ProductCategory getProductCategoryById(long id) {
		return productCategoryRepository.findById(id).orElse(null);
	}
	
	public ProductCategory getProductCategoryByName(String name) {
		return productCategoryRepository.findByName(name).orElse(null);
	}
	
	public List<ProductCategory> getProductCategoryByType(String type){ 
		return productCategoryRepository.findByType(type);
	}
	
	public ProductCategory getProductCategoryByProductId(long pid) {
		return productCategoryRepository.findByProductId(pid).orElse(null);
	}
	
	public ProductCategory updateProductCategory(ProductCategory pc) {
		ProductCategory existingpc = productCategoryRepository.findById(pc.getId()).orElse(null);
		existingpc.setCategory(pc.getCategory());
		existingpc.setType(pc.getType());
		return productCategoryRepository.save(existingpc);
	}
	
	public ProductCategory deleteProductCategory(long id) {
		ProductCategory pc = new ProductCategory();
		pc = getProductCategoryById(id);
		productCategoryRepository.deleteById(id);
		return pc;
	}
}
