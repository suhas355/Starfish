#!/bin/bash

std='./3.op'

file=$1

isSh=`echo $file | egrep "^.*\.sh$"`

if [ $? -ne 0 ]; then
	return 0
fi

#Hack case

res=`cat $file | egrep "bc"`

if [ $? -ne 0 ];then
	return 0
fi

res=`cat $file | egrep "^#.*bc"`

if [ $? -ne 1 ];then
	return 0
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
echo "scale=2; $matching/$required*100"| bc -l


