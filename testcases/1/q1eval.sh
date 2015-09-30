#!/bin/bash

#std1='./testcases/1/1.op'
std1='./1.op'

file=$1
rollno=$2
isSh=`echo $file | egrep "^.*\.sh$"`

if [ $? -ne 0 ]; then
	#mongo localhost/students --eval "db.scoreinfos.update({userid:\"$rollno\",qno:1},{\$set:{score:0}})"
	echo "0"
	exit 0
fi

cd "./uploads/$rollno/1" > /dev/null
file=`echo "$file" | rev | cut -d '/' -f1 | rev`
file="../$file"
#Hack case

res=`cat $file | egrep -e "121" -e "875" -e "539" `

if [ $? -eq 0 ];then
	#mongo localhost/students --eval "db.scoreinfos.update({userid:\"$rollno\",qno:1},{\$set:{score:0}})"
	echo "0"
	exit 0
fi


chmod +x $file 1> /dev/null 2> /dev/null

template=(`cat $std1`)



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
score=`echo "$matching/$required*100"| bc -l`
#mongo localhost/students --eval "db.scoreinfos.update({userid:\"$rollno\",qno:1},{\$set:{score:\"$score\"}})"
echo $score

cd - > /dev/null


