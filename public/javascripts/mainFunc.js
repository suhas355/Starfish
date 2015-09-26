function calculate(value,filename){
  			var content = {
  				"qno":value,
  				"fname":filename

  			};
  			var purl="/main/evaluate";
  			 $.ajax({
			           type: "POST",
			           url: purl,
			           dataType: 'json',
			           data: content,
			          

	           success: function(data)
	           {	
	           		var obj= JSON.parse(data);
		            document.getElementById('status'+value).innerHTML = '<b style="color:green;">executed</b>';
	           		document.getElementById('res'+value).innerHTML = '<b >'+obj.score+'</b>';
	           },
	           error: function(data)
	           {
	          		
	           }
  				});
  			}

  		function createTable(){
  			var table = document.getElementById('scoretable');

  			for(i=1;i<12;i++){
  				if( i == 10 ) 
  				{
  					continue;
  				}
  				if(i==11)
  					var row = table.insertRow(i-1);
  				else
  					var row = table.insertRow(i);

  				var cel1 = row.insertCell(0);
  				var cel2 = row.insertCell(1);
  				var cel3 = row.insertCell(2);
  				var cel4 = row.insertCell(3);
  				var cel5 = row.insertCell(4);

  				cel1.innerHTML = '<span class="qno">Q'+i+'</span>';

  				var f = document.createElement("form");
				f.setAttribute('method',"post");
				f.setAttribute('id','uploadform'+i);
				f.setAttribute('enctype','multipart/form-data');
				f.setAttribute('name',"upform"+i);
				f.setAttribute('action',"javascript:uploadclick("+i+");");

				var inp = document.createElement("input"); //input element, text
				inp.setAttribute('type',"file");
				inp.setAttribute('name',"uploadfile");
				inp.setAttribute('id',"file"+i);

				var s = document.createElement("input"); //input element, Submit button
				s.setAttribute('type',"submit");
				s.setAttribute('value',"Upload");
				s.setAttribute('name',"submit");
				s.setAttribute('id','button'+i);
				s.setAttribute('class',"uploadbutton");


				f.appendChild(inp);
				f.appendChild(s);
  				cel2.appendChild(f);
				if(i<4)
					cel3.innerHTML = '<b>10</b>';
				else if(i<8)
					cel3.innerHTML = '<b>15</b>';
				else if(i<12)
					cel3.innerHTML = '<b>20</b>';
				else
					cel3.innerHTML = '<b>50</b>';

				cel4.className = 'status';
				cel4.id = 'status'+i;
				cel4.innerHTML='<b>idle</b>';

				cel5.className = 'res';
				cel5.id = 'res'+i;
				cel5.innerHTML = '<b>0</b>';
  			}
  			j=10;
  			for(i=10;i<=12;i++){
  				if(i == 11){
  					continue;
  				}
  				var row1 = table.insertRow(j);
  				var row2 = table.insertRow(j+1);
  				j = j + 3;
  				var cel11 = row1.insertCell(0);
  				var cel12 = row1.insertCell(1);
  				var cel13 = row1.insertCell(2);
  				var cel14 = row1.insertCell(3);
  				var cel15 = row1.insertCell(4);

  				var cel21 = row2.insertCell(0);
  				var cel22 = row2.insertCell(1);
  				var cel23 = row2.insertCell(2);
  				var cel24 = row2.insertCell(3);
  				var cel25 = row2.insertCell(4);

  				cel11.innerHTML = '<span class="qno">Q'+i+'a</span>';
  				cel21.innerHTML = '<span class="qno">Q'+i+'b</span>';

  				/* A */

  				var f1 = document.createElement("form");
				f1.setAttribute('method',"post");
				f1.setAttribute('id','uploadform'+i+'a');
				f1.setAttribute('enctype','multipart/form-data');
				f1.setAttribute('name',"upform"+i+'a');
				f1.setAttribute('action',"javascript:uploadclick(\""+i+"a\");");

				var inp1 = document.createElement("input"); //input element, text
				inp1.setAttribute('type',"file");
				inp1.setAttribute('name',"uploadfile");
				inp1.setAttribute('id',"file"+i+'a');

				var s1 = document.createElement("input"); //input element, Submit button
				s1.setAttribute('type',"submit");
				s1.setAttribute('value',"Upload");
				s1.setAttribute('name',"submit");
				s1.setAttribute('id','button'+i+'a');
				s1.setAttribute('class',"uploadbutton");


				f1.appendChild(inp1);
				f1.appendChild(s1);
  				cel12.appendChild(f1);

  				/* B */

  				var f2 = document.createElement("form");
				f2.setAttribute('method',"post");
				f2.setAttribute('id','uploadform'+i+'b');
				f2.setAttribute('enctype','multipart/form-data');
				f2.setAttribute('name',"upform"+i+'b');
				f2.setAttribute('action',"javascript:uploadclick(\""+i+"b\");");

				var inp2 = document.createElement("input"); //input element, text
				inp2.setAttribute('type',"file");
				inp2.setAttribute('name',"uploadfile");
				inp2.setAttribute('id',"file"+i+'b');

				var s2 = document.createElement("input"); //input element, Submit button
				s2.setAttribute('type',"submit");
				s2.setAttribute('value',"Upload");
				s2.setAttribute('name',"submit");
				s2.setAttribute('id','button'+i+'b');
				s2.setAttribute('class',"uploadbutton");

				f2.appendChild(inp2);
				f2.appendChild(s2);
				cel22.appendChild(f2);



				if(i == 10){
					cel13.innerHTML = '<b>20</b>';
					cel23.innerHTML = '<b>20</b>';
				}
				else{
					cel13.innerHTML = '<b>50</b>';
					cel23.innerHTML = '<b>50</b>';
				}

				cel14.className = 'status';
				cel14.id = 'status'+i+'a';
				cel14.innerHTML='<b>idle</b>';

				cel24.className = 'status';
				cel24.id = 'status'+i+'b';
				cel24.innerHTML='<b>idle</b>';

				cel15.className = 'res';
				cel15.id = 'res'+i + 'a';
				cel15.innerHTML = '<b>0</b>';

				cel25.className = 'res';
				cel25.id = 'res'+i+'b';
				cel25.innerHTML = '<b>0</b>';
  			}

  		}
  		function uploadclick(value){
  			var f = document.getElementById('file'+value);
  			var formData = document.forms.namedItem("upform"+value);
       		var ready=new FormData(formData);
  			
  			if(f==undefined || f.value == ''){
  				$('.error').fadeIn(400).delay(1000).fadeOut(400);
  			}else{
  				document.getElementById('status'+value).innerHTML = '<b style="color:blue;">running</b>';
  			
  				$.ajax({
  					 url: "/upload",
       				 data: ready,
      				 cache: false,
    				 contentType: false,
    				 processData: false,
    				 type: "POST",
				     success: function(data){ 
				      		var obj = JSON.parse(data);
				      		calculate(value,f.value);
				     },
				     error: function(data){
				     	var obj = JSON.parse(data);
				      	 alert(obj.res);
				     }
  				});
  			}
  		}