$(function(){
	useQuerySrc();	
});

var source = $('.source');

function woop(){	
	var levels = getUrlVars()["levels"]; // are number of levels specified?
	for (var i=0; i < (levels || 15 ) ; i++){
		var lastSource = $('.sources .source:last-child'); 
		var newSource = lastSource.clone().appendTo('.sources'); // duplicate last media source and append to images
		var prevSource = newSource.prev();
		var prevWidth = prevSource.width(); // get width of media source above new media source
		var newWidth = (prevWidth / 120) * 100; 
		newSource.css('width', newWidth); // set width of new media source
	}
	setShape();
	setAnimate();
}

function getUrlVars(){ // get query string parameters
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++){
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;    
}

function useQuerySrc(){
	var videoSrc = getUrlVars()["video"];
	var imageSrc = getUrlVars()["src"]; // is an alternate image src specified?
	if (undefined !== imageSrc && imageSrc.length){
		$('.source:first-child').replaceWith("<img src='"+imageSrc+"' class='source'/>");
		woop();
	} else if ( videoSrc === "yes") {
		$('.source:first-child').replaceWith("<video autoplay class='source'></video>");
		getVideo();
	}
	else{
		woop();
	}
}

function setShape(){
	var shape = getUrlVars()["shape"]; // is a shape specified?
	if ( shape === "square" ) {
		$('.source:first-child').siblings().css('border-radius','none');
	} else {
		$('.source:first-child').siblings().css('border-radius','100%');
	}
}

function setAnimate(){
	var animate = getUrlVars()["animate"]; // are we animating this baby?
	if ( animate === "yes" ) {
		$('.sources .source:nth-child(odd)').addClass('animate-odd'); // odd numbered media sources go clockwise
		$('.sources .source:nth-child(even)').addClass('animate-even'); // even numbered media sources go counter clockwise
		$('.source:first-child').removeClass(); // first media source stays put
	} else {
		$(source).removeClass('animate-odd');
		$(source).removeClass('animate-even');
	}
}

function getVideo(){
 	var errorCallback = function(e) {  
	   alert('awww, do it', e); // alert when user does not allow cam
	 };

	navigator.getUserMedia  = navigator.getUserMedia ||
	                          navigator.webkitGetUserMedia ||
	                          navigator.mozGetUserMedia ||
	                          navigator.msGetUserMedia;

	var video = document.querySelector('video');

	if (navigator.getUserMedia) {
	  navigator.getUserMedia({audio: true, video: true}, function(stream) {
	    video.src = window.URL.createObjectURL(stream);
	    woop();
	  }, errorCallback);
	} else {
	  alert("you can't webrtc with your browser") // alert when user's browser doesnt support webrtc
	}
}
