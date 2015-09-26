#!/bin/bash


#test case 1
path="./testcases/11/"

troll="201405524"
actualtar="${path}201405524_Assignment3.tar.gz" #append the path
tarpat="Assignment3"
folderpat="Assign3"
filepat="sh"

troll1="201405525"
actualtar1="${path}201405525_Assignment3.tar.gz"
filepat2="html"
filepat3="pdf"


file=$1
rollno=$2
isSh=`echo $file | egrep "^.*\.sh$"`

if [ $? -ne 0 ]; then
	#mongo localhost/students --eval "db.scoreinfos.update({userid:\"$rollno\",qno:1},{\$set:{score:0}})"
	echo "0"
	exit 0
fi

total=0

chmod +x $file 1> /dev/null 2> /dev/null

error1='Error: Usage: <Rollno> <TarPath> <Tar pattern> <Inside folder pattern> <Inside file format files>'


#run the script uploaded for testcase 1
act=`bash $file $troll $actualtar`

#echo "$act"

if [ "$act" ==  "$error1" ]
then
total=`expr $total + 10`
fi

#run script uploaded for valid simple testcase

 act=`bash $file $troll $actualtar $tarpat $folderpat $filepat`

# echo "$act"

if [ "$act" == 'Good one' ]
then
 		total=`expr $total + 20`
fi 

act=`bash $file $troll "abc" $tarpat $folderpat $filepat`

#echo "$act"

if [ "$act" == 'Error: Invalid tar path' ]
then
 		total=`expr $total + 20`
fi 

act=`bash $file $troll $actualtar $tarpat "wrongFolder" $filepat`

if [ "$act" == 'Error: Invalid Folder Name' ]
then
 		total=`expr $total + 20`
fi 

act=`bash $file $troll1 $actualtar1 $tarpat $folderpat $filepat $filepat2 $filepat3`

if [ "$act" == 'Good one' ]
then
 		total=`expr $total + 20`
fi 

act=`bash $file $troll1 $actualtar1 $tarpat $folderpat $filepat`

if [ "$act" == 'Error: Internal file invalid format' ]
then
 		total=`expr $total + 20`
fi 


echo $total
 		

