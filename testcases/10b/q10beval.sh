#!/bin/bash

file=$1
rollno=$2

isSh=`echo $file | egrep "^.*\.sh$"`
if [ $? -ne 0 ]; then
	#mongo localhost/students --eval "db.scoreinfos.update({userid:\"$rollno\",qno:1},{\$set:{score:0}})"
	echo "0"
	exit 0
fi

chmod +x $file 1> /dev/null

score=0


#check if 10 \


cp $file ./uploads/${rollno}/10b/10b.sh >/dev/null

cd "./uploads/$rollno/10b" >/dev/null 

q10a="../${rollno}_10a.sh"

if [ ! -e "$q10a" ]; then
	echo "0"
	exit 0
fi

cp $q10a ./10a.sh 	>/dev/null



chmod +x * >/dev/null


expected="010HfszhSUHASsuhas"

act=`timeout 3 bash 10b.sh Suhas | tr -d ' \t\n\r'`
if [ "$act" == "$expected" ]; then
	score=`expr $score + 20`
fi	

expected="100876123123"

act=`timeout 3 bash 10b.sh 123 | tr -d ' \t\n\r'`
if [ "$act" == "$expected" ]; then
	score=`expr $score + 20`
fi	



expected="101876.43123.56123.56"

act=`timeout 3 bash 10b.sh 123.56 | tr -d ' \t\n\r'`
if [ "$act" == "$expected" ]; then
	score=`expr $score + 20`
fi	

expected="1118.8.8.81.1.1.11.1.1.1"

act=`timeout 3 bash 10b.sh 1.1.1.1 | tr -d ' \t\n\r'`
if [ "$act" == "$expected" ]; then
	score=`expr $score + 20`
fi	

expected="111Z8y.7.XA1B.2.Ca1b.2.c"

act=`timeout 3 bash 10b.sh A1b.2.C | tr -d ' \t\n\r'`
if [ "$act" == "$expected" ]; then
	score=`expr $score + 20`
fi	




echo "$score"

cd - >/dev/null 2> /dev/null