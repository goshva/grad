#!/usr/bin/python3
import json 
from datetime import datetime

def add2text (name,date,sortcode,title,discription,images):
    text = '''---
title: "'''+title+'''"
date: '''+date+'''
draft: false
tags: ["'''+name+'''"]

# meta description
description : "'''+discription[:160]+'''"

# product Price
price: "20.00"
priceBefore: "25.00"

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


name = "russian_izba"
# Opening JSON file 
f = open(name+'.json',) 
  
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
            print(u)

    edges = i["edge_media_to_caption"]["edges"]
    for u in edges: 
        fulldiscription =u["node"]['text']
    for image in images:
        imageStr = '''  - image: "'''+image+'''"\n'''
        imagesList+=imageStr
    fulldiscription = fulldiscription.replace('"','\\"')
    if fulldiscription: #checkit
        title = fulldiscription.split()[0]
#    if "#" in discription:
#        discriptiontitle = fulldiscription.split('#', 1)[1]
    if imagesList and len(imagesList) > 1:
        f = open(name+"_"+i["shortcode"]+".md", "w")
        f.write(add2text(name,date,shortcode,title,fulldiscription,imagesList))
        f.close()

f.close()



