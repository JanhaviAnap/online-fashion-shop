package com.springboot.ecommerce.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="cart_item")
public class CartItem {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private long id;
	@Column(name="user_email")
	private String userEmail;
	@Column(name="cart_id")
	private long cartId;
	@Column(name="product_id")
	private long productId;
	@Column(name="product_name")
	private String productName;
	@Column(name="product_image_url")
	private String productImageUrl;
	@Column(name="product_unit_price")
	private long productUnitPrice;
	@Column(name="quantity")
	private long productQuantity;
	
	public CartItem( String userEmail, long cartId, long productId, String productName, String productImageUrl, long productUnitPrice,
			long productQuantity ) {
		super();
		this.userEmail = userEmail;
		this.cartId = cartId;
		this.productId = productId;
		this.productName = productName;
		this.productImageUrl = productImageUrl;
		this.productUnitPrice = productUnitPrice;
		this.productQuantity = productQuantity;
	}
	
	public CartItem() {
		
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
	
	public String getUserEmail() {
		return userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}
	
	public long getCartId() {
		return cartId;
	}

	public void setCartId(long cartId) {
		this.cartId = cartId;
	}

	public long getProductId() {
		return productId;
	}

	public void setProductId(long productId) {
		this.productId = productId;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getProductImageUrl() {
		return productImageUrl;
	}

	public void setProductImageUrl(String productImageUrl) {
		this.productImageUrl = productImageUrl;
	}

	public long getProductUnitPrice() {
		return productUnitPrice;
	}

	public void setProductUnitPrice(long productUnitPrice) {
		this.productUnitPrice = productUnitPrice;
	}

	public long getProductQuantity() {
		return productQuantity;
	}

	public void setProductQuantity(long productQuantity) {
		this.productQuantity = productQuantity;
	}
	
}
