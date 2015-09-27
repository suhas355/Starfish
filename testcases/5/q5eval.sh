#!/bin/bash


file=$1
rollno=$2
src="./uploads/$rollno/5/dir"
isSh=`echo $file | egrep "^.*\.sh$"`

if [ $? -ne 0 ]; then
	echo "0"
	exit 0
fi



chmod +x $file 1> /dev/null 2> /dev/null

#preprocessing

path="./uploads"
rollno=$1
src="./testcases/5/."

rm  -rf "${path}/${rollno}/5/" && mkdir "${path}/${rollno}/5/" 

cp -r "$src" "${path}/${rollno}/5/"

########################
score=0

#test 1
actual=`bash $file 2> /dev/null`
if [ "$actual" == "Error: Invalid number of arguments!" ];then
	score=`expr $score + 10`
fi

#test2
actual=`bash $file $src/abc.txt 2> /dev/null`
if [ "$actual" == "Error:Invalid input!" ];then
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
actual=`bash $file $src 2> /dev/null`
if [ "$actual" == "Warning: File klm already exists. Skipping abc." ];then
	score=`expr $score + 20`
fi

expected="./uploads/$rollno/5/dir/:abcghijKlIjklm.txtmy_inpsubuvw./uploads/$rollno/5/dir/sub:2ak.cuvw"

dest="./uploads/$rollno/5/dir/"
actual=`ls -R $dest `
actual=`echo "$actual" |tr -d " \t\n\r"`

if [ "$actual" == "$expected" ]; then
	score=`expr $score + 50`
fi

echo $score



