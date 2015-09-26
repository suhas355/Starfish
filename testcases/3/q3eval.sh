#!/bin/bash

actualop="./testcases/3/3.op"
#actualop="./3.op"

file=$1
rollno=$2
isSh=`echo $file | egrep "^.*\.sh$"`

if [ $? -ne 0 ]; then
	#mongo localhost/students --eval "db.scoreinfos.update({userid:\"$rollno\",qno:1},{\$set:{score:0}})"
	echo "0"
	exit 0
fi

total=0

chmod +x $file 1> /dev/null 2> /dev/null

act=(`bash $file | tr -d " \t"`)

res=(`cat $actualop`)


for i in {0..10}; do
	l="${act[i]}"
	r="${res[i]}"
	l=`echo ${l::-2}`
	r=`echo ${r::-2}`
	if [ "$l" == "$r" ]
		then
			total=`expr $total + 1`
	else
		total=`expr $total / 3`
		total=`expr $total \* 10`
		echo "$total"
		exit 0
	fi

done

total=`expr $total / 3`

if [ "$total" -eq 9 ]
then
	echo "100"
else
		total=`expr $total \* 10`
		echo "$total"
fi						



