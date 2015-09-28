#!/bin/bash


file=$1
rollno=$2

src="./2/dir"
file=`echo "$file" | rev | cut -d '/' -f1 | rev`

cd "./uploads/$rollno" >/dev/null 2> /dev/null
isSh=`echo $file | egrep "^.*\.sh$"`

if [ $? -ne 0 ]; then
	echo "0"
	exit 0
fi

chmod +x $file 1> /dev/null 2> /dev/null

score=0

#test 1
actual=`bash $file `
if [ "$actual" == "Error: Invalid number of arguments!" ];then
	score=`expr $score + 10`
fi

#test2
actual=`bash $file $src/3.c `
if [ "$actual" == "Error: Invalid input!" ];then
	score=`expr $score + 10`
fi

#test3
# chmod 000 $src > /dev/null 2> /dev/null
# actual=`bash $file $src `
# if [ "$actual" == "Error: Access denied!" ];then
# 	score=`expr $score + 10`
# fi
# chmod -R 775 $src >/dev/null 2> /dev/null

rm -rf ./2/dir
cp -r ../../testcases/2/dir ./2/
#test4
expected="./2/dir/:11.py23.pytrash./2/dir/trash:1.c2.c2.py33.c"
inp="./2/input1"

actual=`bash $file $src < $inp `
if [ "$actual" == "Error: File type not found!" ];then
	score=`expr $score + 10`
fi
trash="./2/dir/trash"
if [ -e $dest ]; then
	score=`expr $score + 10`
fi

dest="./2/dir/"
actual=`ls -R $dest `
actual=`echo "$actual" |tr -d " \t\n\r"`

if [ "$actual" == "$expected" ]; then
	score=`expr $score + 50`
fi

cd - > /dev/null
echo $score



