#!/bin/bash

path="./uploads"
rollno=$1
src="./testcases/."

rm  -rf ${path}/${rollno}/?
rm  -rf ${path}/${rollno}/??
rm  -rf ${path}/${rollno}/???
rm -rf ${path}/${rollno}/10a.sh
rm -rf ${path}/${rollno}/4.sh
rm -rf ${path}/${rollno}/12a.sh
rm -rf ${path}/${rollno}/12b.sh
cp -r "$src" "${path}/${rollno}/"