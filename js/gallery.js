var numImages=0;
var currentImage=1;
var totalWidth=0;
var imageWidth;
var numOfTTPics=22;
var numOfOtherPics=2;


$(document).ready(function(){	

	/*load all pics in the pic folder*/
	var picInHtml=$( "#gallery-ul" ).html();
	if(location.pathname.substring(location.pathname.lastIndexOf("/") + 1).indexOf("tt_life")==-1)
	{
		for (var i=0;i<=numOfOtherPics;i++)
		{ 
			picInHtml+="<li class=\"gallery-li\"><img class=\"gallery-img\" src=\"personal_img/otherPics/pic"+i+".jpg\"/></li>";
		}
	}
	for (var i=0;i<=numOfTTPics;i++)
	{ 
		picInHtml+="<li class=\"gallery-li\"><img class=\"gallery-img\" src=\"personal_img/tt_life/pic"+i+".jpg\"/></li>";
	}

	$( "#gallery-ul" ).html(picInHtml);
	imageWidth=$('.gallery-li').width();
	




	
	// loop through the <li> and calculate total width
	$('.gallery-li').each(function(){
		numImages++;
		totalWidth+=imageWidth;
	});


	$('#gallery-ul').css('width', totalWidth+'%');
	$('.gallery-li').css('width', (imageWidth/numImages)+'%');
	
	
	$('#more_photo_button').click(function(){
		$( ".wrapper-border" ).animate({
    		width: "90%"
  		}, {
    		duration: 1200,
    		step: function() {
      			var width=$("#gallery-ul").width();
				var height=$('#gallery-ul').height();
 			   adjImageRatio(width, height)
    		},
    		complete: function() {
      			var width=$("#gallery-ul").width();
				var height=$('#gallery-ul').height();
 			   adjImageRatio(width, height)
    		}
  		});
		$('.wrapper-border').css('display', 'inline');
		
	});


	$('.rightbtn').click( function(){
		moveLeft();
		showHideButton();
	});

	$('.leftbtn').click( function(){
		moveRight();
		showHideButton();
	});
	showHideButton();

	$('div.close').click(function(){
		$('.wrapper-border').animate( {width:'10%'}, 500, 'swing');
		setTimeout(function(){
		$('.wrapper-border').css('display', 'none');
    	},500)
		});	
	adjustCloseButton();
	//adjImageRatioBasedOnPercentage();	// different fcn than adjImageRatio due to jQuery bug
	
})

$(window).resize(function() {
		var width=$("#gallery-ul").width();
		var height=$('#gallery-ul').height();
        adjImageRatio(width, height);
        adjustCloseButton();
    });

function adjImageRatio(width, height) {	// this function adjusts the image width ratio to ensure it's 540*480 using width of gallery-ul in px

    if (width/numImages>(height*54/48)){
		$('.gallery-img').css('width', (height*54/48)+"px");
		$('.gallery-img').css('height', (height)+"px");
	}else{
		$('.gallery-img').css('width', (width/numImages)+"px");	
		$('.gallery-img').css('height', (width/numImages)*48/54+"px");	
	}
}


function adjustCloseButton(){
	// close button
	if ($( window ).width()<900){
		$('div.close').css('font-size', (($( window ).width())/5)+'%');
		$('div.close').css('padding', '-15px');
	}
	else{
		$('div.close').css('font-size', '300%');
		$('div.close').css('padding', '0px');
	}
}

// click right button and move the film to the left
function moveLeft(){
	if(currentImage < numImages){
		$('#gallery-ul').animate( {'marginLeft':'-='+imageWidth+'%'}, 600, 'swing');
		currentImage++;
	}
	
}

function moveRight(){
	if(currentImage>1){
		$('#gallery-ul').animate({'marginLeft' : '+='+imageWidth+'%'}, 600, 'swing');
		currentImage--;
	}
	
}

function showHideButton(){
	if(currentImage==1){
		$('.leftbtn').hide();
	}
	else{
		$('.leftbtn').show();
	}
	if(currentImage==numImages){
		$('.rightbtn').hide();
	}
	else{
		$('.rightbtn').show();
	}
}

