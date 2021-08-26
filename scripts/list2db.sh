#!/bin/bash
   arr=("$@")
   for i in "${arr[@]}";
      do
          echo "$i"
          #instagram-scraper $i -u goshva13 -p mordor902 --media-metadata --media-types none
          #python3 db.py $i
          py.exe db.py $i
      done

