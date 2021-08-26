#!/usr/bin/python3
import csv
import urllib.request


url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRSdhydoUmEwcFZ0vzSfdXzal_rMUn3tjN9IfrgQDqYpp0KzDa3mHYdI3aN0MEkfy6YiJJbLMzF4Jyq/pub?output=csv'
#url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTNUzu5GOXqoXhe6vzOtozm14HJ8xx8u8uzzIl5pg7S3Pp3xyswb5FxTRtEDBGxtOCwBM7mtPuGXO96/pub?output=csv'
urllib.request.urlretrieve(url, './data.csv')
list = ""
with open('data.csv', encoding='utf-8', newline='') as File:  
    reader = csv.reader(File)
    for row in reader:
        name = row[2]
        if name and name !="link 2 insta":
            print(name)
            list+=" "+name
#        f = open(name+".md", "x")
#        f.write(add2text(name))
#        f.close()
print(list)
