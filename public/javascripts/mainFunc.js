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

  			for(i=1;i<=12;i++){
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