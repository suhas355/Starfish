#!/bin/bash

file=$1
rollno=$2

resource="./resource.db"

cp $file "./uploads/${rollno}/12a/"  >/dev/null 
file=`echo "$file" | rev | cut -d '/' -f1 | rev`


cd "./uploads/${rollno}/12a" >/dev/null
score=0

act=`timeout 7 bash $file`

if [ -e "./resource_{rollno}.db" ]; then
	resource="./resource_{rollno}.db"
fi

if [ ! -e "$resource" ]; then
	echo "0"
	exit 0
fi

act=`tail -2 $resource |head -1 | egrep "^.*,.*,.*,.*$"`
if [ $? -eq 0 ]; then
	score=`expr $score + 30`
	#echo "t1"
fi

act=`cat $resource | wc -l`
if [ $act -ge 5 ]; then
	score=`expr $score + 40`
	#echo "t2"
fi

act=`cat $resource | tail -n +2 |egrep -v "[A-Za-z]"`
if [ $? -eq 0 ]; then
	score=`expr $score + 30`
	#echo "t3"
fi

echo "$score"

cd - >/dev/null 2> /dev/null