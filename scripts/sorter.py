#!/usr/bin/python3
import sys
import json
import re
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

destUrl = "/home/goshva/hugo-sites/grad/content/products/"
char = "₽"
name = sys.argv[1]
# Opening JSON file 
f = open(name+'/'+name+'.json',) 
  
# returns JSON object as  
# a dictionary 
data = json.load(f) 
  
# Iterating through the json 
# list
for i in data['GraphImages']:
    images = []
    imagesList = ""
    shortcode = i["shortcode"]
    title = ""
    timestamp = ""
    date = ""
    discription = ""
    fulldiscription =""
    price=""
    #   if "tags" in i:
#       for tag in i["tags"]: 
#           print(tag)
#    for u in i["urls"]: 
#        print(u)
     
    timestamp =  i["taken_at_timestamp"] 
    date = datetime.utcfromtimestamp(timestamp).strftime('%Y-%m-%d')

    for u in i["urls"]:
        if ".jpg"  in u:
            images.append(u)

    edges = i["edge_media_to_caption"]["edges"]
    for u in edges: 
        fulldiscription =u["node"]['text']

    if "₽" in fulldiscription:
        pricewhithcur =re.findall(r"\d+" + char , fulldiscription)[0]
        price = pricewhithcur[0:-1]
    else:
        price = "3000"

    for image in images:
        imageStr = '''  - image: "'''+image+'''"\n'''
        imagesList+=imageStr
    fulldiscription = fulldiscription.replace('"','\\"')
    fulldiscription = fulldiscription.replace('-','//-')
    if fulldiscription: 
        out = " ".join(fulldiscription.split()[:2])
        title = re.sub(r'[^\w\s]','',out)

    if imagesList and len(images) > 1:
        f = open(destUrl+name+"_"+i["shortcode"]+".md", "w")
        f.write(add2text(name,date,shortcode,title,fulldiscription,price,imagesList))
        f.close()

f.close()



