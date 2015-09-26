#!/bin/bash


file=$1
rollno=$2
src="./uploads/$rollno/4/dir"
noperm="./uploads/$rollno/4/noperm"
dest="./uploads/$rollno/4/ndir"
isSh=`echo $file | egrep "^.*\.sh$"`

if [ $? -ne 0 ]; then
	#mongo localhost/students --eval "db.scoreinfos.update({userid:\"$rollno\",qno:1},{\$set:{score:0}})"
	echo "0"
	exit 0
fi


#Hack case

# res=`cat $file | egrep ".*cp -r.*"`

# if [ $? -eq 0 ];then
# 	echo "0"
# 	exit 0
# fi

chmod +x $file 1> /dev/null 2> /dev/null

expected="./uploads/$rollno/4/ndir:dir./uploads/$rollno/4/ndir/dir:dir2f1./uploads/$rollno/4/ndir/dir/dir2:f2"

score=0
#test 1
actual=`bash $file 2> /dev/null`
if [ "$actual" == "Error: Invalid number of arguments!" ];then
	score=`expr $score + 10`
fi

#test2
actual=`bash $file $src 2> /dev/null`
if [ "$actual" == "Error: Invalid number of arguments!" ];then
	score=`expr $score + 10`
fi

#test3
actual=`bash $file "./uploads/$rollno/4/abs" 2> /dev/null`
if [ "$actual" == "Error: Invalid input!" ];then
	score=`expr $score + 10`
fi

#test4
actual=`bash $file $src $dest 2> /dev/null`
if [ "$actual" == "" ];then
	score=`expr $score + 10`
fi

if [ -e $dest ]; then
	score=`expr $score + 10`
fi

actual=`ls -R $dest `

actual=`echo "$actual" |tr -d " \t\n\r"`
#echo $actual
#echo $expected
if [ "$actual" == "$expected" ]; then
	score=`expr $score + 50`
fi

echo $score





