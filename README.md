# Online-Fashion-Shop
e-commerce website using spring boot and angular

## Cloning the project ##
Clone the repository onto your system by running the following code in a directory of your choice:
```
git clone https://github.com/JanhaviAnap/online-fashion-shop.git
```
now enter into the project folder by:
```
cd Online-Fashion-Shop/
```

## Creating databse in MySQL ##
in mysql run the following command to create database
```
create database onlineshop;
```

## Creating tables and entering data in tables ##
enter into the database directory by:
```
cd database/
```
run the [fill.py](https://github.com/JanhaviAnap/Online-Fashion-Shop/blob/main/database/fill.py) using following command:
<br>
make sure to update the user and password values in the [fill.py](https://github.com/JanhaviAnap/Online-Fashion-Shop/blob/main/database/fill.py) in the connector
```
python fill.py
```
to see the created tables run following commands
```
use onlineshop;
show tables;
```

## Openning Spring Boot Project ##
1. open spring boot in online-fashion-shop folder, i.e. where we have cloned our project
2. click import projects
3. import the online-fashion-shop-backend when asked for browse
