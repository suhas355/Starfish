#!/bin/bash

pi=`echo "3.142" | bc -l`

rad=`echo "$pi / 180" | bc -l`

i=0

while [ $i -le 360 ]
do
	y=`echo "s( $pi * $i / 180 )" | bc -l`
	printf "%d	%0.4f\n" $i $y
	i=`expr $i + 10`
done

