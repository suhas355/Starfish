#!/bin/bash

file=$1
rollno=$2
#src="./uploads/$rollno/4/dir"


isSh=`echo $file | egrep "^.*\.sh$"`
if [ $? -ne 0 ]; then
	#mongo localhost/students --eval "db.scoreinfos.update({userid:\"$rollno\",qno:1},{\$set:{score:0}})"
	echo "0"
	exit 0
fi

cd "./uploads/$rollno" >/dev/null 2> /dev/null

chmod +x $file 1> /dev/null 2> /dev/null

score=0

####test case 1####

meta1="t1.meta"
inp1="t1.inp"



act=`timeout 3 bash $file $meta1 <$inp1 2> /dev/null`
res=`echo $act | tr -d ' \t\n\r-'`


outfile="t1_${rollno}.db"

if [ -e "$outfile" ]
then
	$score=`expr $score + 10`
fi		

if [ "$res" == "A|Ba1|b1" ]
then
 	$score=`expr $score + 20`
fi

####test case 2####

meta2="t2.meta"
inp2="t2.inp"



act=`timeout 3 bash $file $meta <$inp2 2> /dev/null`

val=`echo $act | egrep "deleted successfully"`
if [ $? -eq 0 ]; then
	$score=`expr $score + 20`
fi

val=`echo $act | egrep "delete was unsuccessful"`
if [ $? -eq 0 ]; then
	$score=`expr $score + 20`
fi

val=`echo $act | egrep "a1"| egrep "b1"`
if [ $? -ne 0 ]; then
	$score=`expr $score + 20`
fi

val=`echo $act | egrep "C"| egrep "D"`
if [ $? -eq 0 ]; then
	$score=`expr $score + 10`
fi

echo "$score"

cd - >/dev/null 2> /dev/null