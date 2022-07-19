package com.springboot.ecommerce.entity;

import java.sql.Timestamp;
//import java.time.LocalDateTime;
//import java.time.format.DateTimeFormatter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="cart_history")
public class Order {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private long id;
	@Column(name="user_email")
	private String userEmail;
	@Column(name="total_quantity")
	private long totalQuantity;
	@Column(name="total_price")
	private long totalPrice;
	@Column(name="payment_status")
	private String paymentStatus;
	@Column(name="name")
	private String name;
	@Column(name="email")
	private String email;
	@Column(name="address")
	private String Address;
	@Column(name="city")
	private String City;
	@Column(name="state")
	private String State;
	@Column(name="pincode")
	private long pincode;
	@Column(name="last_modified")
	private Timestamp timestamp;
//	DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
	
	public Order(String userEmail, long totalQuantity, long totalPrice, String paymetStatus, String name, String email, String address,
			String city, String state, long pincode, Timestamp timestamp) {
		super();
		this.userEmail = userEmail;
		this.totalQuantity = totalQuantity;
		this.totalPrice = totalPrice;
		this.paymentStatus = paymetStatus;
		this.name = name;
		this.email = email;
		Address = address;
		City = city;
		State = state;
		this.pincode = pincode;
		this.timestamp = timestamp;
	}
	
	public Order() {
		
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

	
	
	public long getTotalQuantity() {
		return totalQuantity;
	}

	public void setTotalQuantity(long totalQuantity) {
		this.totalQuantity = totalQuantity;
	}

	public long getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(long totalPrice) {
		this.totalPrice = totalPrice;
	}
	
	public String getPaymentStatus() {
		return paymentStatus;
	}

	public void setPaymentStatus(String paymetStatus) {
		this.paymentStatus = paymetStatus;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAddress() {
		return Address;
	}

	public void setAddress(String address) {
		Address = address;
	}

	public String getCity() {
		return City;
	}

	public void setCity(String city) {
		City = city;
	}

	public String getState() {
		return State;
	}

	public void setState(String state) {
		State = state;
	}

	public long getPincode() {
		return pincode;
	}

	public void setPincode(long pincode) {
		this.pincode = pincode;
	}

	public Timestamp getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(Timestamp timestamp) {
		this.timestamp = timestamp;
	}
	
	
}