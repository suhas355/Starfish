#!/bin/bash

file=$1
rollno=$2

dir="./9/foodpanda"

cd "./uploads/$rollno" >/dev/null 2> /dev/null


isSh=`echo $file | egrep "^.*\.sh$"`
if [ $? -ne 0 ]; then
	#mongo localhost/students --eval "db.scoreinfos.update({userid:\"$rollno\",qno:1},{\$set:{score:0}})"
	echo "0"
	exit 0
fi

# ./a.out hotsoursoup 3 eggbiryani 2 plainroti 5 paneer65 2 milkshake 4
# ./a.out raitha  2 jeerarice 2 sweetparatha 4 paneer65 2 lassi 4
# ./a.out icecream 2 jeerarice 2 alooparatha 4 gobi65 10 milkshake 2
# ./a.out raitha 2 jeerarice 2 alooparatha 4 gobi65 3
# ./a.out coldplaincurd 5 vegbiryani 1 plainroti 1 chickendry 1 lassi 1
# ./a.out raitha 2 hotsoursoup 2 vegbiryani 1 lassi 1 milkshake 1

score=0

tc1=`timeout 2 bash $file $dir hotsoursoup 3 eggbiryani 2 plainroti 5 paneer65 2 milkshake 4`
res=`echo $tc1 | egrep -e "Desi Masala" -e "755"`
if [ $? -eq 0 ]
then
	score=`expr $score + 20`
fi

tc2=`timeout 2 bash $file $dir raitha  2 jeerarice 2 sweetparatha 4 paneer65 2 lassi 4`
res=`echo $tc1 | egrep  "Desi Masala" |egrep "600"`
if [ $? -eq 0 ]
then
	score=`expr $score + 20`
fi

tc3=`timeout 2 bash $file $dir icecream 2 jeerarice 2 alooparatha 4 gobi65 10 milkshake 2`
res=`echo $tc1 | egrep -e "Item Not Found"`
if [ $? -eq 0 ]
then
	score=`expr $score + 10`
fi

tc4=`timeout 2 bash $file $dir raitha 2 jeerarice 2 alooparatha 4 gobi65 3`
res=`echo $tc1 | egrep -e "Atleast One Item From Each Category"`
if [ $? -eq 0 ]
then
	score=`expr $score + 10`
fi

tc5=`timeout 2 bash $file $dir coldplaincurd 5 vegbiryani 1 plainroti 1 chickendry 1 lassi 1`
res=`echo $tc1 | egrep  "Tummykart" | egrep "435"`
if [ $? -eq 0 ]
then
	score=`expr $score + 20`
fi

tc6=`raitha 2 hotsoursoup 2 vegbiryani 1 lassi 1 milkshake 1`
res=`echo $tc1 | egrep -e "Atleast One Item From Each Category"`
if [ $? -eq 0 ]
then
	score=`expr $score + 20`
fi

echo "$score"