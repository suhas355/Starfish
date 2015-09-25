#!/bin/bash
let sum=0
for ((i=1000;i<=9999;i++))
do
	let n=$i
	let f1=0 #Flag One
	let f2=0 #Flag Two
	let f3=0 #Flag Three
	while [ $n -gt 0 ]
	do
		let m=$n%10
		let n=$n/10
		#echo "n is "
		#echo $n
	
		if [ $m -eq 6 ] || [ $m -eq 7 ] || [ $m -eq 8 ]
		then
			if [ $f1 -eq 1 ]
			then			
				if [ $f2 -eq 1 ]
				then			
					let f3=1 
					#echo "f3 is 1"
				else
					let f2=1 
					#echo "f2 is one"
				fi
				
				 
				#echo "YES"
			else
				let f1=1				
							
			fi
		fi
		# PRINT STATUS: echo $f1 $f2 $f3 $i
	done
	if [ $f1 -eq 1 ]
	then
		if [ $f2 -eq 1 ]
		then
			if [ $f3 -ne 1 ]			
			then			
				let sum=$sum+$i
				#echo "Sum Added"
				#echo $i
			fi
		fi	
	fi
done
echo $sum
exit 0
