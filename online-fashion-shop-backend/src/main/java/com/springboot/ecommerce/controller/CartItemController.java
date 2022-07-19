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

import com.springboot.ecommerce.entity.CartItem;
import com.springboot.ecommerce.service.CartItemService;

@RestController
@CrossOrigin(origins="http://localhost:4200")
@RequestMapping("api/")
public class CartItemController {
	@Autowired 
	private CartItemService cartItemService;
	
	@PostMapping("cart/add")
	public CartItem addCartItem(@RequestBody CartItem cartItem) {
		return cartItemService.addCartItem(cartItem);
	}
	@PutMapping("cart/incrementQuantity")
	public CartItem incrementQuantity(@RequestBody CartItem cartItem) {
		return cartItemService.incrementQuantity(cartItem);
	}
	@PutMapping("cart/decrementQuantity")
	public CartItem decrementQuantity(@RequestBody CartItem cartItem) {
		return cartItemService.decrementQuantity(cartItem);
	}
	@PutMapping("cart/updateQuantity")
	public CartItem updateQuantity(@RequestBody CartItem cartItem) {
		return cartItemService.updateQuantity(cartItem);
	}
	@GetMapping("cart/{id}")
	public CartItem getCartItemById(@PathVariable long id) {
		return cartItemService.getCartItemById(id);
	}
	@GetMapping("cart/itemId/{email}/{cartId}/{productId}")
	public CartItem getCartItemByProductId(@PathVariable String email,@PathVariable long cartId, @PathVariable long productId) {
		return cartItemService.getCartItemByProductId(email,cartId, productId);
	}
	@GetMapping("cart/cartId/{email}/{cartId}")
	public List<CartItem> getCartItemsByCartId(@PathVariable String email, @PathVariable long cartId) {
		return cartItemService.getCartItemsByCartId(email, cartId);
	}
	@DeleteMapping("cart/delete/{id}")
	public CartItem removeCartItem(@PathVariable long id) {
		return cartItemService.removeCartItem(id);
	}
	
}
