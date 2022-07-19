package com.springboot.ecommerce.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
//import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

import com.springboot.ecommerce.entity.Product;

//@CrossOrigin("http://localhost:4200")
@Repository
public interface ProductRepository extends JpaRepository<Product, Long>{
//public interface ProductRepository extends PagingAndSortingRepository<Product,Long>{
	
//	Page<Product> findByCategoryId(@RequestParam("id") Long id, Pageable pageable);
	
//	@Query("select p from Product p where p.categoryId=:id")
//	List<Product> getProductsByCategoryId(@RequestParam("id") Long id);

	@Query("select p from Product p where p.name=:name")
	Optional <Product> findByName(@RequestParam String name);

	@Query("select p from Product p where p.categoryId=:categoryId")
	List <Product> findByCategory(@RequestParam long categoryId);
	
	@Query("select p from Product p where p.name like %:keyword%")
	List <Product> findByKeyword(@RequestParam String keyword);
	
//	@Query("select p from Product p where p.unitPrice>:rangeStart and p.unitPrice>:rangeEnd")
//	List <Product> findBetweenRange(@RequestParam long rangeStart, @RequestParam long rangeEnd);
}
