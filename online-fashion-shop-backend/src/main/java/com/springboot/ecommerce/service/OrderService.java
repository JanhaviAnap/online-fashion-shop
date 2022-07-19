package com.springboot.ecommerce.service;

import java.util.Date;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.ecommerce.dao.CartItemRepository;
import com.springboot.ecommerce.dao.OrderRepository;
import com.springboot.ecommerce.entity.CartItem;
import com.springboot.ecommerce.entity.Order;

@Service
public class OrderService {
	@Autowired
	private OrderRepository orderRepository;
	
	private CartItemRepository cartItemRepository;
	
	public Order createOrder(String email) {
//		setPrevOrderPaid(email);
		Order order = new Order();
		order.setUserEmail(email);
		order.setPaymentStatus("unpaid");
		order.setTotalPrice(0);
		order.setTotalQuantity(0);
		return orderRepository.save(order);
	}
	
	public long getCartIdbyEmail(String email) {
		return orderRepository.getCartIdbyEmail(email);
	}
	
	public Order getCartbyEmail(String email) {
		return orderRepository.getCartbyEmail(email);
	}
	
	public void setPrevOrderPaid(String email) {
//		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd/MM/uuuu HH:mm:ss");
		SimpleDateFormat sdf3 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date date = new Date();
//		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
//		LocalDateTime now = LocalDateTime.now();
//		System.out.println(sdf3.format(timestamp));
		orderRepository.setPrevOrderPaid(email,date);
	}
	public Order saveAddress(Order order) {
		return orderRepository.save(order);
	}
	// CURRENT_TIMESTAMP
	public Order checkout(Order order) {
//		setPrevOrderPaid(order.getUserEmail());
		setPrevOrderPaid(saveAddress(order).getUserEmail());
		System.out.println("CHECKOUT :=> "+order.toString());
		return createOrder(order.getUserEmail());
	}
	
	public Order getOrderByEmail(String email) {
		return orderRepository.getOrderByEmail(email);
	}
	
	public List<Order> getPreviousOrders(String email){
		List<Order> tempOrderList = orderRepository.getPreviousOrders(email);
		System.out.println("Before orders : "+tempOrderList.toString());
		tempOrderList.remove(tempOrderList.size()-1);
		System.out.println("After orders : "+tempOrderList.toString());
		return tempOrderList;
		
	}
	
	public Order computeTotals(String email) {
		Order order = getOrderByEmail(email);
		List<CartItem> cartItems = new ArrayList<CartItem>();
		cartItems = orderRepository.findAllByCartId(order.getUserEmail(),order.getId());
		long totalPriceValue = 0;
		long totalQuantityValue = 0;
		System.out.println("cartItems");
		for(CartItem ci: cartItems) {
//			totalPriceValue += cartItems.get(i).getProductUnitPrice()*cartItems.get(i).getProductQuantity();
//			totalQuantityValue += cartItems.get(i).getProductQuantity();
			totalPriceValue = totalPriceValue + ci.getProductUnitPrice()*ci.getProductQuantity();
			totalQuantityValue = totalQuantityValue + ci.getProductQuantity();
			System.out.println(ci.getProductUnitPrice()*ci.getProductQuantity()+" "+ci.getProductQuantity());
			System.out.println(ci.getProductName()+" bruhhhh "+ci.getProductUnitPrice()+" "+ci.getProductQuantity());
		}
		System.out.println("bruhhhh "+totalPriceValue+" "+totalQuantityValue);
		orderRepository.updateTotals(order.getId(),totalPriceValue,totalQuantityValue);
		order.setTotalQuantity(totalQuantityValue);
		order.setTotalPrice(totalPriceValue);
		return orderRepository.save(order);
	}
}
