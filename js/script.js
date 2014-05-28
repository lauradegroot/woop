$(function(){
	for (var i=0; i < 15; i++){
		woop();
	}	
});

var woop = function(){
	var image = $('.image img:last-child');
	var newImage = image.clone().appendTo('.image');
	var prevImage = newImage.prev();
	var prevWidth = prevImage.width();
	var newWidth = (prevWidth / 120) * 100;
	newImage.css('width', newWidth);
}