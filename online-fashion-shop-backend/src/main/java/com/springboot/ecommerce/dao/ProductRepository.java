package com.springboot.ecommerce.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import com.springboot.ecommerce.entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>{

	@Query("select p from Product p where p.name=:name")
	Optional <Product> findByName(@RequestParam String name);

	@Query("select p from Product p where p.categoryId=:categoryId")
	List <Product> findByCategory(@RequestParam long categoryId);
	
	@Query("select p from Product p where p.name like %:keyword%")
	List <Product> findByKeyword(@RequestParam String keyword);
	
}
