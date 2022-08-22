package com.springboot.ecommerce.dao;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;

import com.springboot.ecommerce.entity.CartItem;
import com.springboot.ecommerce.entity.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order,Long>{
	@Query("select o.id from Order o where o.userEmail=:email and o.paymentStatus='unpaid'")
	long getCartIdbyEmail(@RequestParam String email);
	
	@Query("select o from Order o where o.userEmail=:email and o.paymentStatus='unpaid'")
	Order getCartbyEmail(@RequestParam String email);
	
	@Modifying
	@Transactional
	@Query("update Order o set o.paymentStatus='paid',o.timestamp=:inpTime where o.paymentStatus='unpaid' and o.userEmail=:email")
	void setPrevOrderPaid(@RequestParam String email,@RequestParam Date inpTime);
	
	@Query("select o from Order o where o.userEmail=:email and o.paymentStatus='unpaid'")
	Order getOrderByEmail(@RequestParam String email);
	
	@Modifying
	@Transactional
	@Query("update Order o set o.totalPrice=:totalPriceValue,o.totalQuantity=:totalQuantityValue where o.id=:id")
	void updateTotals(@RequestParam long id, @RequestParam long totalPriceValue, @RequestParam long totalQuantityValue);
	
	@Query("select ci from CartItem ci where ci.userEmail=:email and ci.cartId=:cartId")
	List<CartItem> findAllByCartId(@RequestParam String email, @RequestParam long cartId);
	
	@Query("select o from Order o where o.userEmail=:email order by o.timestamp desc")
	List<Order> getPreviousOrders(@RequestParam String email);
}
