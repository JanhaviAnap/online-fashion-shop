package com.springboot.ecommerce.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.ecommerce.dao.CartItemRepository;
import com.springboot.ecommerce.entity.CartItem;

@Service
public class CartItemService {
	@Autowired
	private CartItemRepository cartItemRepository;
	
	public CartItem addCartItem(CartItem cartItem) {
		return cartItemRepository.save(cartItem);
	}
	public CartItem incrementQuantity(CartItem cartItem) {
		cartItemRepository.incrementQuantity(cartItem.getUserEmail(),cartItem.getCartId(),cartItem.getProductId());
		return getCartItemById(cartItem.getId());
	}
	
	public CartItem decrementQuantity(CartItem cartItem) {
		cartItemRepository.decrementQuantity(cartItem.getUserEmail(),cartItem.getCartId(),cartItem.getProductId());
		return getCartItemById(cartItem.getId());
	}
	
	public CartItem getCartItemByProductId(String email,long cartId,long productId) {
		return cartItemRepository.findbyProductId(email,cartId,productId);
	}
	
	public List<CartItem> getCartItemsByCartId(String email,long cartId){
		return cartItemRepository.findAllByCartId(email,cartId);
	}
	
	public CartItem getCartItemById(long id) {
		return cartItemRepository.findById(id).orElse(null);
	}
	
	public CartItem updateQuantity(CartItem newCartItem) {
		CartItem existingCI = getCartItemByProductId(newCartItem.getUserEmail(),newCartItem.getCartId(),newCartItem.getProductId());
		existingCI.setProductQuantity(newCartItem.getProductQuantity());
		return cartItemRepository.save(existingCI);
	}
	
	public CartItem removeCartItem(long id) {
		CartItem newCI = getCartItemById(id);
//		CartItem newCI = getCartItemByProductId(ci.getUserEmail(),ci.getCartId(),ci.getProductId());
		cartItemRepository.deleteById(id);
		System.out.println("deleting item: "+newCI.toString());
		return newCI;
	}
}
