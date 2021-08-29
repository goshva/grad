#!/usr/bin/python3
import sys
import json
import re
import sqlite3
from datetime import datetime

def add2text (name,date,sortcode,title,discription,price,images):
    priceBefore = str(1.2*float(price))
    text = '''---
title: "'''+title+'''"
date: '''+date+'''
draft: false
tags: ["'''+name+'''"]

# meta description
description : "'''+discription[:160]+'''"

# product Price
price: "'''+price+'''"
priceBefore: "'''+priceBefore+'''"

# Product Short Description
shortDescription: "'''+discription+'''"

#product ID
productID: "'''+shortcode+'''"

# type must be "products"
type: "products"

# product Images
# first image will be shown in the product page
images:
'''+imagesList+'''
---
lorem
'''
    return text

destUrl = "../content/products/"
char = "₽"
#name = sys.argv[1]
def wpage(name,date,shortcode,title,fulldiscription,price,imagesList):
    f = open(destUrl+name+"_"+shortcode+".md", "w")
    f.write(add2text(name,date,shortcode,title,fulldiscription,price,imagesList))
    f.close()

name =""
date=""
shortcode=""
title=""
fulldiscription=""
price=""
imagesList=""
#
con = sqlite3.connect("grad.db")
cur = con.cursor()
cur.execute("select name,date,sortcode,title,discription,price,images from lots")
records = cur.fetchall()
print("Total rows are:  ", len(records))
for row in records:
    name =row[0]
    date=row[1]
    shortcode=row[2]
    title=row[3]
    fulldiscription=row[4]
    price=row[5]
    imagesList=row[6]
  
    wpage(name,date,shortcode,title,fulldiscription,price,imagesList)
con.close()

