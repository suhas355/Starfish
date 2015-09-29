#!/bin/bash

file=$1
rollno=$2

isSh=`echo $file | egrep "^.*\.sh$"`
if [ $? -ne 0 ]; then
	#mongo localhost/students --eval "db.scoreinfos.update({userid:\"$rollno\",qno:1},{\$set:{score:0}})"
	echo "0"
	exit 0
fi

chmod +x $file 1> /dev/null 2> /dev/null

score=0


val=`cat $file | egrep "isalpha"`
if [ $? -eq 0 ]; then
	score=`expr $score + 10`
fi

val=`cat $file | egrep "isdigit"`
if [ $? -eq 0 ]; then
	score=`expr $score + 15`
fi

val=`cat $file | egrep "negate"`
if [ $? -eq 0 ]; then
	score=`expr $score + 20`
fi

val=`cat $file | egrep "toupper"`
if [ $? -eq 0 ]; then
	score=`expr $score + 15`
fi

val=`cat $file | egrep "tolower"`
if [ $? -eq 0 ]; then
	score=`expr $score + 15`
fi

val=`cat $file | egrep "isalnum"`
if [ $? -eq 0 ]; then
	score=`expr $score + 15`
fi

val=`cat $file | egrep -c "^[^#]*return"`
if [ $val -ge 6 ]; then
	score=`expr $score + 10`
fi


echo "$score"