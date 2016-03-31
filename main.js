

function slideshow(slide,image) {
	hide_slides();

	var $slide = document.querySelector('.o' + slide);
	if(!$slide) {
		show_slides();
		return true;
	}
	if (image == 0) {
		show_only_slide($slide);
	} else {
		var $images = $slide.querySelectorAll('img');
		if(!$images[image-1]) return false;
		fullscreen_image($images[image-1]);
	}
	return true;
}

function show_only_slide($slide) {
	$slide.style.display = 'block';
}

function fullscreen_image($img) {
	$img = $img.cloneNode(true);
	$img.className = "fullscreen";
	document.body.className = "fullscreen_body";
	document.body.appendChild($img);
}

function hide_slides() {
	document.body.className = "";
	var $slides = document.querySelectorAll("[class^='o']");
	for(var i = 0; i < $slides.length; i++){
		$slides[i].style.display = 'none';
	}

	var $images = document.querySelectorAll(".fullscreen");
	for(var i = 0; i < $images.length; i++){
		$images[i].parentNode.removeChild($images[i]);
	}
}

function show_slides() {
	document.body.className = "";
	var $slides = document.querySelectorAll("[class^='o']");
	for(var i = 0; i < $slides.length; i++){
		$slides[i].style.display = 'block';
	}
	slide_num = 0;
	image_num = -1;
	document.querySelector('.fin').style.display = 'none';
}

var slide_num = 0;
var image_num = -1;

document.addEventListener('keyup',function (e) {
	console.log(e.keyCode);
	if (e.keyCode == 27) {
		show_slides();
		return false;
	}
	if(e.keyCode == 32 || e.keyCode == 39) {
		image_num ++;
		var b = slideshow(slide_num,image_num);
		if(!b) {
			slide_num ++;
			image_num = 0;
			slideshow(slide_num,image_num);
		}
	}
	if(e.keyCode == 37) {
		image_num --;
		if(image_num < 0) {
			slide_num --;
			if(slide_num < 0) {
				show_slides();
				return false;
			}
			image_num = 10;
			while(!slideshow(slide_num,image_num)) {
				image_num --;
			}
		}
		slideshow(slide_num,image_num);
	}
	if(e.keyCode == 38) {
		image_num = 0;
		slide_num --;
		slideshow(slide_num,image_num);
	}
	if(e.keyCode == 40) {
		image_num = 0;
		slide_num ++;
		slideshow(slide_num,image_num);
	}

	if(slide_num < 0) {
		show_slides();
	}

	return false;
});



