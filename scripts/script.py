#!/usr/bin/python
import csv
import urllib.request


url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRSdhydoUmEwcFZ0vzSfdXzal_rMUn3tjN9IfrgQDqYpp0KzDa3mHYdI3aN0MEkfy6YiJJbLMzF4Jyq/pub?output=csv'
urllib.request.urlretrieve(url, './data.csv')

def add2text (name):
    text = '''---
title: "Taba Cream"
date: 2019-10-17T11:22:16+06:00
draft: false
tags: ["'''+name+'''"]

# meta description
description : "For Glowing Skin"

# product Price
price: "20.00"
priceBefore: "25.00"

# Product Short Description
shortDescription: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut"

#product ID
productID: "2"

# type must be "products"
type: "products"

# product Images
# first image will be shown in the product page
images:
  - image: "images/products/product-3.png"
  - image: "images/products/product-2.png"
  - image: "images/products/product-1.png"
  - image: "images/products/product-4.png"
---
lorem
'''
    return text

with open('data.csv', newline='') as File:  
    reader = csv.reader(File)
    for row in reader:
        name = row[2]
        print(name)
        f = open(name+".md", "x")

        f.write(add2text(name))
        f.close()
