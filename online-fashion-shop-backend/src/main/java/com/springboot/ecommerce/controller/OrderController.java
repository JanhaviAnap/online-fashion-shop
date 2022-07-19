package com.springboot.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.ecommerce.entity.Order;
import com.springboot.ecommerce.service.OrderService;

@RestController
@CrossOrigin(origins="http://localhost:4200")
@RequestMapping("api/")
public class OrderController {
	@Autowired
	private OrderService orderService;
	
	
	@PostMapping("order/new")
	public Order createOrder(@RequestBody Order order) {
		return orderService.createOrder(order.getUserEmail());
	}
	
	@GetMapping("order/getCartId/{email}")
	public long getCartIdbyEmail(@PathVariable String email) {
		return orderService.getCartIdbyEmail(email);
	}
	
	@GetMapping("order/getCart/{email}")
	public Order getCartbyEmail(@PathVariable String email) {
		return orderService.getCartbyEmail(email);
	}
	
	@GetMapping("order/{email}")
	public Order getOrderByEmail(@PathVariable String email) {
		return orderService.getOrderByEmail(email);
	}
	
	@PutMapping("order/checkout")
	public Order checkout(@RequestBody Order order) {
//		orderService.setPrevOrderPaid(order.getUserEmail());
		return orderService.checkout(order);
	}
	
	@GetMapping("order/computeTotals/{email}")
	public Order computeTotals(@PathVariable String email) {
		return orderService.computeTotals(email);
	}
	
	@GetMapping("order/getPrevOrders/{email}")
	public List<Order> getPreviousOrders(@PathVariable String email){
		return orderService.getPreviousOrders(email);
	}
}
