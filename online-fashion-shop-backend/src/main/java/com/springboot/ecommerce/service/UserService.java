package com.springboot.ecommerce.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.ecommerce.dao.UserRepository;
import com.springboot.ecommerce.entity.Order;
import com.springboot.ecommerce.entity.User;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
		
	public User addUser(User user) {
//		Order order = new Order();
		return userRepository.save(user);
	}
	
	public User getCustomerById(long id) {
		return userRepository.findById(id).orElse(null);
	}
	
	public User getCustomerByEmailId(String email) {
		String type = "customer";
		return userRepository.getUserByEmailId(email,type);
	}
	
	public User getAdminByEmailId(String email) {
		String type = "admin";
		return userRepository.getUserByEmailId(email,type);
	}
	
	public long getIdByCustomerEmail(String email) {
		User u = getCustomerByEmailId(email);
		return u.getId();		
	}
	
	public long getIdByAdminEmail(String email) {
		User u = getAdminByEmailId(email);
		return u.getId();		
	}
	
	public boolean verifyCustomer(String email, String password) {
		String type = "customer";
		int count = userRepository.checkPassword(email,password,type);
		if(count==1) {
			return true;
		}
		return false;
	}
	
	public boolean verifyAdmin(String email, String password) {
		String type = "admin";
		int count = userRepository.checkPassword(email,password,type);
		if(count==1) {
			return true;
		}
		return false;
	}
	
	public User updateCustomer(User user) {
		User existingUser = getCustomerByEmailId(user.getEmailId());
		existingUser.setEmailId(user.getEmailId());
		existingUser.setPassword(user.getPassword());
		existingUser.setUserName(user.getUserName());
		return userRepository.save(existingUser);
	}
	
	public User updateAdmin(User user) {
		User existingUser = getAdminByEmailId(user.getEmailId());
		existingUser.setEmailId(user.getEmailId());
		existingUser.setPassword(user.getPassword());
		existingUser.setUserName(user.getUserName());
		return userRepository.save(existingUser);
	}
	
	public User deleteCustomer(String email) {
		String type = "customer";
		User u = new User();
		u = getCustomerByEmailId(email);
		userRepository.deleteById(u.getId());
		return u;
	}
	
	public User deleteAdmin(String email) {
		String type = "admin";
		User u = new User();
		u = getAdminByEmailId(email);
		userRepository.deleteById(u.getId());
		return u;
	}
}
