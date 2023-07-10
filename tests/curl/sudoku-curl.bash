#!/bin/bash

dataFile=$1
solveUrl=http://localhost:8080/sudoku/solve

if [ -z $dataFile ]; then
    echo 'usage:  $0 <jsonfile>'
    echo where jsonfile is file that has a request to the $solveUrl
    exit -1
fi

if [ ! -e $dataFile ]; then 
    echo parameter file $1 does not exist
    exit -1
fi



echo input ....
cat $dataFile
echo ' ' 
echo call to $solveUrl ....
curl -H "Content-Type: application/json" -d @$dataFile $solveUrl
