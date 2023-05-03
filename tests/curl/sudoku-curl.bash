#!/bin/bash

if [ ! -e $1 ]; then 
    echo parameter file $1 does not exist
    exit -1
fi

dataFile=$1
solveUrl=http://localhost:8080/solve

echo input ....
cat $dataFile
echo ' ' 
echo call to $solveUrl ....
curl -H "Content-Type: application/json" -d @$dataFile $solveUrl
