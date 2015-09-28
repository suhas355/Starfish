#!/bin/bash

file=$1

isSh=`echo $file | egrep "^.*\.sh$"`

if [ $? -ne 0 ]; then
	return 0
fi

chmod +x $file 1> /dev/null 2> /dev/null

total=0
checktput=`cat "$file" |  egrep "^[^#]*tput"`
if [ $? -eq 0 ]; then
	total=`expr $total + 25`
fi

checktput=`cat "$file" |  egrep "^[^#]*clear"`
if [ $? -eq 0 ]; then
	total=`expr $total + 20`
fi

checktput=`cat "$file" |  egrep "^[^#]*cup"`
if [ $? -eq 0 ]; then
	total=`expr $total + 20`
fi

act=`timeout 2 bash $file 2> /dev/null`

if [ "$act" == "Error: Invalid number of arguments!" ]
then
	total=`expr $total + 15`
fi

act=`timeout 2 bash $file 12312312 2> /dev/null`

if [ "$act" == "Error: Invalid input!" ]
then
	total=`expr $total + 20`
fi


echo "$total"


#tput
#clear
#Invalid input!
#Error: Invalid number of arguments!