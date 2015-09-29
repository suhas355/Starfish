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

cp $file "./uploads/${rollno}/8/"  >/dev/null 2> /dev/null

cd "./uploads/${rollno}/8" >/dev/null 2> /dev/null
file=`echo "$file" | rev | cut -d '/' -f1 | rev`

chmod +x $file 1> /dev/null 2> /dev/null

score=0

####test case 1####

meta1="./t1.meta"
inp1="./t1.inp"



act=`timeout 3 bash $file $meta1 <$inp1 ` >/dev/null 2> /dev/null
res=`echo $act | tr -d ' \t\n\r-'`


outfile="t1_${rollno}.db"


if [ -e "$outfile" ]
then
	score=`expr $score + 10`
fi		
val=`echo "$res" | egrep "A|Ba1|b1"`
if [ $? -eq 0 ]
then
 	score=`expr $score + 20`
fi

####test case 2####

meta2="./t2.meta"
inp2="./t2.inp"



act=`timeout 3 bash $file $meta2 <$inp2` >/dev/null 2> /dev/null
val=`echo $act | egrep "deleted successfully"`
if [ $? -eq 0 ]; then
	score=`expr $score + 20`
fi
val=`echo $act | egrep "delete was unsuccessful"`
if [ $? -eq 0 ]; then
	score=`expr $score + 20`
fi
val=`echo $act | egrep "a1"| egrep "b1"`
if [ $? -ne 0 ]; then
	score=`expr $score + 20`
fi

val=`echo $act | egrep "C"| egrep "D"`
if [ $? -eq 0 ]; then
	score=`expr $score + 10`
fi

echo "$score"

rm -f "t1_${rollno}.db" >/dev/null 
rm -f "t2_${rollno}.db" >/dev/null 



cd - >/dev/null 2> /dev/null