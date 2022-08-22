package com.springboot.ecommerce.dao;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import com.springboot.ecommerce.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
	
	@Query("select count(u) from User u where u.emailId=:emailId and u.password=:password and u.userType=:type")
	int checkPassword (@RequestParam String emailId, @RequestParam String password, @RequestParam String type);
	
	@Query("select u from User u where u.emailId=:emailId and u.userType=:userType")
	User getUserByEmailId(@RequestParam String emailId, @RequestParam String userType);
}
