#!/bin/bash

file=$1
rollno=$2

resource="./resource.db"


cp $file "./uploads/${rollno}/12b/"  >/dev/null 
file=`echo "$file" | rev | cut -d '/' -f1 | rev`

cd "./uploads/${rollno}/12b" >/dev/null
cp $resource ./resource_${rollno}.db

score=0

act=`timeout 3 bash $file`

if [ "$act" == "Invalid number of arguments!" ];then
	score=`expr $score + 10`
fi	

act=`timeout 3 bash $file 7 l`
if [ "$act" == "Invalid argument" ];then
	score=`expr $score + 10`
fi	

act=`timeout 3 bash $file 1 l`
if [ "$act" == "0.41" ];then
	score=`expr $score + 15`
fi	

act=`timeout 3 bash $file 2 a | egrep '\.27'`
if [ $? -eq 0 ];then
	score=`expr $score + 20`
fi	

act=`timeout 3 bash $file 3 m`
if [ "$act" == "0.43" ];then
	score=`expr $score + 15`
fi	

act=`timeout 3 bash $file 4 s`
if [ "$act" == "0.14" ];then
	score=`expr $score + 10`
fi	

act=`timeout 3 bash $file 1 p`
if [ -e "cpu_${rollno}.png" ];then
	score=`expr $score + 30`
fi	

echo "$score"

cd - >/dev/null 2> /dev/null