#! /bin/bash
for (( i=0 ; i<= 360 ; i=i+10 ))
do
    result=`bc -l <<< "scale=5; s ( $i*3.142/180 )"`
    printf '%d\t%.4f \n' $i $result
done
