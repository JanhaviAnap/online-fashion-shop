package com.springboot.ecommerce.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

import com.springboot.ecommerce.entity.ProductCategory;
import com.springboot.ecommerce.entity.Product;

@CrossOrigin(origins="http://localhost:4200")
//@RepositoryRestResource(collectionResourceRel="productCategory",path="productCategory")
@Repository
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long>{
	
	@Query("select pc from ProductCategory pc where pc.type= :type")
	public List<ProductCategory> findByType(@RequestParam String type);

	@Query("select pc from ProductCategory pc where pc.category= :name")
	public Optional<ProductCategory> findByName(@RequestParam String name);
	
	@Query("select pc from ProductCategory pc where pc.id=(select p.categoryId from Product p where p.id=:pid)")
	public Optional<ProductCategory> findByProductId(@RequestParam long pid);
}
