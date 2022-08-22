package com.springboot.ecommerce.controller;

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

import com.springboot.ecommerce.entity.User;
import com.springboot.ecommerce.service.UserService;

@RestController
@CrossOrigin(origins="http://localhost:4200")
@RequestMapping("api/")
public class UserController {

	@Autowired
	private UserService userService;
		
	@PostMapping("customer/add")
	public User addCustomer(@RequestBody User user) {
		return userService.addUser(user);
	}
	
	@PostMapping("admin/add")
	public User addAdmin(@RequestBody User user) {
		return userService.addUser(user);
	}
	
	@GetMapping("customer/{id}")
	public User getCustomerById(@PathVariable long id) {
		return userService.getCustomerById(id);
	}
	
	@GetMapping("customer/byEmail/{email}")
	public User getCustomerByEmailId(@PathVariable String email) {
		return userService.getCustomerByEmailId(email);
	}
	
	@GetMapping("admin/byEmail/{email}")
	public User getAdminrByEmailId(@PathVariable String email) {
		return userService.getAdminByEmailId(email);
	}
	
	@PutMapping("customer/update")
	public User updateCustomer(@RequestBody User user) {
		return userService.updateCustomer(user);
	}
	
	@PutMapping("admin/update")
	public User updateAdmin(@RequestBody User user) {
		return userService.updateAdmin(user);
	}
	
	@DeleteMapping("customer/delete/{email}")
	public User deleteCustomer(@PathVariable String email){
		return userService.deleteCustomer(email);
	}
	
	@DeleteMapping("admin/delete/{email}")
	public User deleteAdmin(@PathVariable String email){
		return userService.deleteAdmin(email);
	}
}
