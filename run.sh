#!/bin/bash

if [ "$#" -ne 2 ]; then
  echo "Please provide output dir and bib number"
  exit 1
fi

out=$1
bibNum=$2

urls=$(node index.js $bibNum)
i=0

mkdir -p $out

for url in $urls; do
  wget "$url" -O "$out/$i.jpg"
  i=$(( i + 1 ))
done
