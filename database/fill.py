import csv
import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="Abcd@1234",
  database="onlineshop"
)

mycursor = mydb.cursor()

# create table user
sql = """CREATE TABLE `onlineshop`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email_id` VARCHAR(450) NULL,
  `password` VARCHAR(45) NULL,
  `user_type` VARCHAR(45) NULL,
  `user_name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
"""
mycursor.execute(sql)

# create table product
sql = """CREATE TABLE `onlineshop`.`product` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(500) NULL,
  `description` VARCHAR(5000) NULL,
  `image_url` VARCHAR(600) NULL,
  `unit_price` DECIMAL(13,2) NULL,
  `units_in_stock` INT NULL,
  `category_id` INT NULL,
  PRIMARY KEY (`id`))
"""
mycursor.execute(sql)

# create table product category
sql = """CREATE TABLE `onlineshop`.`product_category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `category` VARCHAR(500) NULL,
  `type` VARCHAR(50) NULL,
  PRIMARY KEY (`id`))
"""
mycursor.execute(sql)

# create table cart item
sql = """CREATE TABLE `onlineshop`.`cart_item` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_email` VARCHAR(450) NULL,
  `cart_id` INT NULL,
  `product_id` INT NULL,
  `product_name` VARCHAR(200) NULL,
  `product_image_url` VARCHAR(200) NULL,
  `product_unit_price` INT NULL,
  `quantity` INT NULL,
  PRIMARY KEY (`id`))
"""
mycursor.execute(sql)

# create table cart history
sql = """CREATE TABLE `onlineshop`.`cart_history` (
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
  PRIMARY KEY (`id`))
"""
mycursor.execute(sql)

mycursor.execute("SHOW TABLES")
for x in mycursor:
  print(x)

sql = "INSERT INTO product_category VALUES (%s,%s,%s)"
file = open('product_category.csv')
csvreader = csv.reader(file)
header =  next(csvreader)
print(header)
print("----------------------")
rows = []
for row in csvreader:
    # typecasting before insert
    row[0] = int(row[0])
    rows.append(row)
for row in rows:
    val = (row[0],row[1], row[2])
    mycursor.execute(sql,val)
    print(row)
print(mycursor.rowcount, "record inserted.")


sql = "INSERT INTO product VALUES (%s,%s,%s,%s,%s,%s,%s)"
file = open('product.csv')
print("p: ",type(file))
csvreader = csv.reader(file)
header = []
header = next(csvreader)
print(header)
print("----------------------")
rows = []
for row in csvreader:
    row[0] = int(row[0])
    row[-1] = int(row[-1])
    row[-2] = int(row[-2])
    row[-3] = int(row[-3])
    rows.append(row)
for row in rows:
    val = (row[0],row[1], row[2], row[3], row[4], row[5], row[6])
    mycursor.execute(sql,val)
    print(row)

file.close()

mydb.commit()
