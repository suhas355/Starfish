#!/bin/bash


file=$1
rollno=$2
#src="./uploads/$rollno/4/dir"
src="./7/dir"
dest="./7/ndir"

ren=`echo "$file" | sed "s/${rollno}_//"`
rm -f $ren >/dev/null 2> /dev/null
mv "$file" "$ren" 
cd "./uploads/$rollno" >/dev/null 2> /dev/null

file="$ren"
file=`echo "$file" | rev | cut -d '/' -f1 | rev`


isSh=`echo $file | egrep "^.*\.sh$"`
if [ $? -ne 0 ]; then
	#mongo localhost/students --eval "db.scoreinfos.update({userid:\"$rollno\",qno:1},{\$set:{score:0}})"
	echo "0"
	exit 0
fi


#Hack case

res=`cat $file | egrep ".*ls -R.*"`

if [ $? -eq 0 ];then
	echo "0"
	exit 0
fi

res=`cat $file | egrep ".*ls.*"`

if [ $? -eq 0 ];then
	echo "0"
	exit 0
fi


res=`cat $file | egrep ".*find.*"`

if [ $? -eq 0 ];then
	echo "0"
	exit 0
fi

chmod +x $file 1> /dev/null 2> /dev/null
score=0

#test 1
actual=`timeout 2 bash $file ./7/abc 2> /dev/null`
if [ "$actual" == "Error: Invalid File/Directory!" ];then
	score=`expr $score + 10`
fi

src="./7/d1"
#test2
chmod 000 $src > /dev/null 2> /dev/null
actual=`timeout 2  bash $file $src` #2> /dev/null`
if [ "$actual" == "Warning! No permission" ];then
	score=`expr $score + 10`
fi
chmod -R 775 $src >/dev/null 2> /dev/null

#test3
actual=`timeout 2  bash $file $src` 
actual="echo $actual | tr -d '\n\r\t '"
res=`echo $actual | egrep "d1" | egrep "d2" | grep "f1" | egrep "f2" | egrep "f3" | egrep "f4" `
if [ $? -eq 0 ]
then
	score=`expr $score + 25`
fi

#test4
src="./7/d2"
actual=`timeout 2  bash $file $src` 
actual="echo $actual | tr -d '\n\r\t '"
#d2:d21f2d2/d21:d31d2/d21/d31:d41d2/d21/d31/d41:a
res=`echo $actual | egrep "d2" | egrep "d21" | egrep "f2" | egrep "d31" | egrep "d41" | egrep "a" `
if [ $? -eq 0 ]
then
	score=`expr $score + 10`
fi

res=`echo $actual | egrep -v "f1"`
if [ $? -eq 0 ]
then
	score=`expr $score + 20`
fi


#test5
#d3:d21f2d3/d21:d31d3/d21/d31:d41dld3/d21/d31/d41:a
src="./7/d3"
actual=`timeout 2 bash $file $src` 
actual=`echo $actual | tr -d '\n\r\t '`
res=`echo $actual | egrep "d3" | egrep "d21" | egrep "f2" | egrep "d31" | egrep "d41" | egrep "a" | egrep "dl"`
if [ $? -eq 0 ]
then
	score=`expr $score + 10`
fi

#test6
#d1.txt:f1
src="./7/d1.txt"
actual=`timeout 2 bash $file $src` 
actual=`echo $actual | tr -d '\n\r\t '`
res=`echo $actual | egrep "d1.txt" | egrep "f1"`
if [ $? -eq 0 ]
then
	score=`expr $score + 15`
fi


cd - >/dev/null
echo $score

