package com.springboot.ecommerce.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;

import com.springboot.ecommerce.entity.CartItem;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long>{

	@Modifying
	@Transactional
	@Query("update CartItem ci set ci.productQuantity=ci.productQuantity+1 where ci.cartId=:cid and ci.userEmail=:email and ci.productId=:pid")
	void incrementQuantity(@RequestParam String email, @RequestParam long cid, @RequestParam long pid);
	
	@Modifying
	@Transactional
	@Query("update CartItem ci set ci.productQuantity=ci.productQuantity-1 where ci.cartId=:cid and ci.userEmail=:email and ci.productId=:pid")
	void decrementQuantity(@RequestParam String email, @RequestParam long cid, @RequestParam long pid);

	@Query("select ci from CartItem ci where ci.userEmail=:email and ci.cartId=:cartId")
	List<CartItem> findAllByCartId(@RequestParam String email, @RequestParam long cartId);
	
	@Query("select ci from CartItem ci where ci.userEmail=:email and ci.cartId=:cartId and ci.productId=:productId")
	CartItem findbyProductId(@RequestParam String email,@RequestParam long cartId, @RequestParam long productId);
}
