import csv
import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="Abcd@1234",
  database="onlineshop"
)

mycursor = mydb.cursor()
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

mydb.commit()
file.close()
