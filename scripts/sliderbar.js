define(['marionette'],function(Marionette){

	return function  (times)
	{

	var start_time=new Array();
	var end_time=new Array();
		
	var min_time=(new Date(2014, 1, 11, 2, 00))/1000/60; 		// time in MINUTES!!!
		var max_time=(new Date(2014, 1, 12, 12, 00))/1000/60;
		for (var i=0; i<times.length; i++){
			if (min_time>times[i].start)
				min_time=times[i].start;
			if (max_time<times[i].end)
				max_time=times[i].end;
		}

		//alert("min time: "+min_time+"max time: "+max_time);
		// add individual votes into the bar
		var content="";
		for (var i=0; i<times.length; i++){			
			var left=((times[i].start-min_time)/(max_time-min_time))*100;
			var width=((times[i].end-times[i].start)/(max_time-min_time))*100;

			content+='<div class="sub-range" style="position: absolute; z-index: 20; height: 100%; left: '+left+'%; width: '+width+'%; background-color: black; opacity: 0.2"></div>';
		}

		$(".other-ranges").html(content);

		// changes the slider value dynamically according to the <input>
		$( ".startT" ).change(function() {
			//alert( "Start time changed" );

			var startT=new Date($( ".startT" ).val());
//alert( startT.valueOf()/1000/60+44640);
			$(".slider-range").slider('values',0,startT.valueOf()/1000/60+44640); // sets first handle (index 0) to 50
		});

		// changes the slider value dynamically according to the <input>
		$( ".endT" ).change(function() {
			//alert( "End time changed" );
			var endT=new Date($( ".endT" ).val());

		$(".slider-range").slider('values',1,endT.valueOf()/1000/60+44640); // sets second handle (index 1) to 80
		});


		/*var template = $("#template").text();
		console.log(template);
		var compiled = Handlebars.compile(template);
		$(".content").html(compiled(data));*/

		$(function() {
			$( ".slider-range" ).slider({
				range: true,
				min: min_time,
			max: max_time,		
			step: 10,
			values: [min_time, max_time ],
			slide: function( event, ui ) {
				var left=new Date(ui.values[0]*60*1000);
				var right=new Date(ui.values[1]*60*1000);

				//alert(("0"+left.getDate()).substring((""+left.getDate()).length -1));

				$( ".startT" ).val(("0"+left.getMonth()).substring((""+left.getMonth()).length -1)+"/"+("0"+left.getDate()).substring((""+left.getDate()).length -1)+"/"+left.getFullYear()+" "+("0"+left.getHours()).substring((""+left.getHours()).length-1)+":"+(left.getMinutes()+"0").substring(0,2));
				$( ".endT" ).val(("0"+right.getMonth()).substring((""+right.getMonth()).length -1)+"/"+("0"+right.getDate()).substring((""+right.getDate()).length -1)+"/"+right.getFullYear()+" "+("0"+right.getHours()).substring((""+right.getHours()).length-1)+":"+(right.getMinutes()+"0").substring(0,2));
			}
		});
			var left=new Date($( ".slider-range" ).slider( "values", 0 )*60*1000);
			var right=new Date($( ".slider-range" ).slider( "values", 1 )*60*1000);
			$( ".startT" ).val(("0"+left.getMonth()).substring((""+left.getMonth()).length -1)+"/"+("0"+left.getDate()).substring((""+left.getDate()).length -1)+"/"+left.getFullYear()+" "+("0"+left.getHours()).substring((""+left.getHours()).length-1)+":"+(left.getMinutes()+"0").substring(0,2));
			$(".endT").val(("0"+right.getMonth()).substring((""+right.getMonth()).length -1)+"/"+("0"+right.getDate()).substring((""+right.getDate()).length -1)+"/"+right.getFullYear()+" "+("0"+right.getHours()).substring((""+right.getHours()).length-1)+":"+(right.getMinutes()+"0").substring(0,2));
		});

}








})