#!/bin/bash


file=$1
rollno=$2
#src="./uploads/$rollno/4/dir"
src="./4/dir"
dest="./4/ndir"

ren=`echo "$file" | sed "s/${rollno}_//"`

mv "$file" "$ren" 

file="$ren"
file=`echo "$file" | rev | cut -d '/' -f1 | rev`


isSh=`echo $file | egrep "^.*\.sh$"`
if [ $? -ne 0 ]; then
	#mongo localhost/students --eval "db.scoreinfos.update({userid:\"$rollno\",qno:1},{\$set:{score:0}})"
	echo "0"
	exit 0
fi

cd "./uploads/$rollno" >/dev/null 2> /dev/null

#Hack case

res=`cat $file | egrep ".*cp -r.*"`

if [ $? -eq 0 ];then
	echo "0"
	exit 0
fi

chmod +x $file 1> /dev/null 2> /dev/null

expected="./4/ndir:dir./4/ndir/dir:dir2f1./4/ndir/dir/dir2:f2"

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
actual=`bash $file "./4/abs" "./4/ndir" 2> /dev/null`
if [ "$actual" == "Error: Invalid input!" ];then
	score=`expr $score + 10`
fi

#test3
chmod 000 $src #> /dev/null 2> /dev/null
actual=`bash $file $src $dest` #2> /dev/null`
if [ "$actual" == "Error: Access denied!" ];then
	score=`expr $score + 10`
fi
chmod -R 775 $src >/dev/null 2> /dev/null
rm -rf ./4/ndir > /dev/null 

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
#echo $expected
if [ "$actual" == "$expected" ]; then
	score=`expr $score + 40`
fi
cd - > /dev/null 
echo $score





