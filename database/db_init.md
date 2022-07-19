## Create and Use Database ##
```
create database onlineshop;
use onlineshop;
```
## Create User Table ##
```
CREATE TABLE `onlineshop`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email_id` VARCHAR(450) NULL,
  `password` VARCHAR(45) NULL,
  `user_type` VARCHAR(45) NULL,
  `user_name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));
```
## Create Product Table ##
```
CREATE TABLE `onlineshop`.`product` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(500) NULL,
  `description` VARCHAR(5000) NULL,
  `image_url` VARCHAR(600) NULL,
  `unit_price` DECIMAL(13,2) NULL,
  `units_in_stock` INT NULL,
  `category_id` INT NULL,
  PRIMARY KEY (`id`));
```
## Create Product Category Table ##
```
CREATE TABLE `onlineshop`.`product_category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `category` VARCHAR(500) NULL,
  `type` VARCHAR(50) NULL,
  PRIMARY KEY (`id`));
```
## Create Cart Item Table ##
```
CREATE TABLE `onlineshop`.`cart_item` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_email` VARCHAR(450) NULL,
  `cart_id` INT NULL,
  `product_id` INT NULL,
  `product_name` VARCHAR(200) NULL,
  `product_image_url` VARCHAR(200) NULL,
  `product_unit_price` INT NULL,
  `quantity` INT NULL,
  PRIMARY KEY (`id`));
```
## Create Cart History Table ##
```
CREATE TABLE `onlineshop`.`cart_history` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_email` VARCHAR(450) NULL,
  `total_quantity` INT NULL,
  `total_price` INT NULL,
  `payment_status` VARCHAR(45) DEFAULT '"unpaid"',
  `name` VARCHAR(200) NULL,
  `email` VARCHAR(45) NULL,
  `address` VARCHAR(200) NULL,
  `city` VARCHAR(45) NULL,
  `state` VARCHAR(45) NULL,
  `pincode` INT NULL,
  `last_modified` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`));
```


