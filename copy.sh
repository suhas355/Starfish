#!/bin/bash

path="./uploads"
rollno=$1
src="./testcases/."

rm  -rf ${path}/${rollno}/?
rm  -rf ${path}/${rollno}/??
rm  -rf ${path}/${rollno}/???

cp -r "$src" "${path}/${rollno}/"