$(function(){
	useQuerySrc();	
});

// first image before being copied, doesn't get border radius or animate. width and height are 100%.
var firstImage = $('.image img:first-child');

function woop(){	
	var levels = getUrlVars()["levels"]; // are number of levels specified?
	for (var i=0; i < (levels || 15 ) ; i++){
		var image = $('.image img:last-child'); 
		var newImage = image.clone().appendTo('.image'); // duplicate last image and append to images
		var prevImage = newImage.prev();
		var prevWidth = prevImage.width(); // get width of image above new image
		var newWidth = (prevWidth / 120) * 100; 
		newImage.css('width', newWidth); // set width of new image
	}
	setShape();
	setAnimate();
}

function getUrlVars(){ // get query string parameters
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;    
}

function useQuerySrc(){
	var imageSrc = getUrlVars()["src"]; // is an alternate image src specified?
	if (undefined !== imageSrc && imageSrc.length){
		firstImage.replaceWith("<img src='"+imageSrc+"'/>");
		woop();
	} else{
		woop();
	}
}

function setShape(){
	var shape = getUrlVars()["shape"]; // is a shape specified?
	if ( shape === "square" ) {
		firstImage.siblings().css('border-radius','none');
	} else {
		firstImage.siblings().css('border-radius','100%');
	}
}

function setAnimate(){
	var animate = getUrlVars()["animate"]; // are we animating this baby?
	if ( animate === "yes" ) {
		$('.image img:nth-child(odd)').addClass('animate-odd'); // odd numbered images go clockwise
		$('.image img:nth-child(even)').addClass('animate-even'); // even numbered images go counter clockwise
		firstImage.removeClass(); // first image stays put
	} else {
		$('.image img').removeClass();
	}
}
