#!/bin/bash


file=$1
rollno=$2\

src="./uploads/$rollno/2/dir"

isSh=`echo $file | egrep "^.*\.sh$"`

if [ $? -ne 0 ]; then
	echo "0"
	exit 0
fi

chmod +x $file 1> /dev/null 2> /dev/null

score=0

#test 1
actual=`bash $file 2> /dev/null`
if [ "$actual" == "Error: Invalid number of arguments!" ];then
	score=`expr $score + 10`
fi

#test2
actual=`bash $file $src/3.c 2> /dev/null`
if [ "$actual" == "Error: Invalid input!" ];then
	score=`expr $score + 10`
fi

#test3
chmod 000 $src > /dev/null 2> /dev/null
actual=`bash $file $src 2> /dev/null`
if [ "$actual" == "Error: Access denied!" ];then
	score=`expr $score + 10`
fi
chmod 775 $src >/dev/null 2> /dev/null


#test4
expected="./uploads/$rollno/2/dir/:11.py23.pytrash./uploads/$rollno/2/dir/trash:1.c2.c2.py33.c"
inp="./uploads/$rollno/2/input1"

actual=`bash $file $src < $inp 2> /dev/null`
if [ "$actual" == "Error: File type not found!" ];then
	score=`expr $score + 10`
fi
trash="./uploads/$rollno/2/dir/trash"
if [ -e $dest ]; then
	score=`expr $score + 10`
fi

dest="./uploads/$rollno/2/dir/"
actual=`ls -R $dest `
actual=`echo "$actual" |tr -d " \t\n\r"`

if [ "$actual" == "$expected" ]; then
	score=`expr $score + 50`
fi

echo $score



