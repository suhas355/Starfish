#!/bin/bash


file=$1
rollno=$2

src="./dir"
file=`echo "$file" | rev | cut -d '/' -f1 | rev`
file="../$file"
cd "./uploads/$rollno/2" >/dev/null
isSh=`echo $file | egrep "^.*\.sh$"`

if [ $? -ne 0 ]; then
	echo "0"
	exit 0
fi

chmod +x $file 1> /dev/null 

score=0

#test 1
actual=`bash $file `
if [ "$actual" == "Error: Invalid number of arguments!" ];then
	#echo "t1"
	score=`expr $score + 10`
fi

#test2
actual=`bash $file $src/3.c `
if [ "$actual" == "Error: Invalid input!" ];then
	#echo "t2"
	score=`expr $score + 10`
fi

#test3
chmod 000 $src > /dev/null
actual=`bash $file $src `
if [ "$actual" == "Error: Access denied!" ];then
	#echo "t3"
	score=`expr $score + 10`
fi
chmod -R 775 $src >/dev/null 

rm -rf ./dir > /dev/null
cp -r ../../../testcases/2/dir .
#test4
expected="./dir/:11.py23.pytrash./dir/trash:1.c2.c2.py33.c"
inp="./input1"

actual=`bash $file $src < $inp `
if [ "$actual" == "Error: File type not found!" ];then
	#echo "t4"
	score=`expr $score + 10`
fi
trash="./dir/trash"
if [ -e $dest ]; then
	#echo "t5"
	score=`expr $score + 10`
fi

dest="./dir/"
actual=`ls -R $dest `
actual=`echo "$actual" |tr -d " \t\n\r"`

if [ "$actual" == "$expected" ]; then
	#echo "t6"
	score=`expr $score + 50`
fi

cd - > /dev/null
echo $score
