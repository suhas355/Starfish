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

hack=`grep -e "0.642" -e "-0.000" <$file | wc -l`

if [ $hack -ne 0 ]
then 
	echo "0"
	exit 0
fi	

chmod +x $file 1> /dev/null 2> /dev/null

act=(`bash $file | tr -d " \t"`)

res=(`cat $actualop`)


for i in {0..30}; do
	# l="${act[i]}"
	# r="${res[i]}"
	# l=`echo ${l::-2}`
	# r=`echo ${r::-2}`

	if [ "${act[i]}" == "${res[i]}" ]
		then
			total=`expr $total + 1`
	else
		break
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



