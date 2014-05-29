$(function(){
	useQuerySrc();	
});

function useQuerySrc(){
	var imageSrc = getUrlVars()["src"];
	if (undefined !== imageSrc && imageSrc.length){
		$('.image img:first-child').replaceWith("<img src='"+imageSrc+"'/>");
		woop();
	} else{
		woop();
	}
}

function woop(){	
	var levels = getUrlVars()["levels"];
	for (var i=0; i < (levels || 15 ) ; i++){
		var image = $('.image img:last-child');
		var newImage = image.clone().appendTo('.image');
		var prevImage = newImage.prev();
		var prevWidth = prevImage.width();
		var newWidth = (prevWidth / 120) * 100;
		newImage.css('width', newWidth);
	}
	setShape();
	setAnimate();
}

function getUrlVars(){
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

function setShape(){
	var shape = getUrlVars()["shape"];
	if ( shape === "square" ) {
		$('.image img:first-child').siblings().css('border-radius','none');
	} else {
		$('.image img:first-child').siblings().css('border-radius','100%');
	}
}

function setAnimate(){
	var animate = getUrlVars()["animate"];
	if ( animate === "yes" ) {
		$('.image img:nth-child(odd)').addClass('animate-odd');
		$('.image img:nth-child(even)').addClass('animate-even');
		$('.image img:first-child').removeClass();
	} else {
		$('.image img:nth-child(even)').siblings().removeClass();
	}
}