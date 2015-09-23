#!/bin/bash

std='./1.op'

file=$1

isSh=`echo $file | egrep "^.*\.sh$"`

if [ $? -ne 0 ]; then
	exit 0
fi

#Hack case

res=`cat $file | egrep -e "5" -e "121" -e "875" -e "539" `

if [ $? -eq 0 ];then
	exit 0
fi


chmod +x $file 1> /dev/null 2> /dev/null

template=(`cat $std`)

act=(`bash $file`)

total=${#template[@]}
if [ ${#act[@]} -lt $total ]; then
	total=${#act[@]}
fi
matching=0
for ((i=0;i<$total;i++)); do
	if [ ${act[i]} == ${template[i]} ]; then
		matching=`expr $matching + 1`
	fi
done

required=${#template[@]}
#echo "match: $matching  req: $required" 
echo "scale=2; $matching/$required*100"| bc -l


