$(function(){
	$('#drake').draggable({
		containment: 'parent',
		scroll: false
	}).resizable({
		containment: 'parent',
		aspectRatio: true
	});
	
	var canvas = $('#canvas');
	var uploadBox = $('#upload-box');
	
	/*$(window).load(function() {
		var m = Math.max.apply(Math, [$('#image').height(),$('#image').width()]);
		if (m < 400)
			m = 400;
		if (m > 680)
			m = 680;
		$('#wrapper').css('height', m);
		$('#wrapper').css('width', m);
		$('#cover').css('height', m);
		$('#cover').css('width', m);
	});*/
	
	$('#ok').click(function() {
		
		var img = document.getElementById("image");

		var vraiTailleImage = [img.naturalWidth, img.naturalHeight];
		var tailleImage = [img.width, img.height];
		var coordImage = $('#image').position();
		var vraiTailleDrake = [151, 245];
		var tailleDrake = [$('#drake').width(), $('#drake').height()];
		var coordDrake = [$('#drake').css('left').replace("px", ""), $('#drake').css('top').replace("px", "")];
		
		var coefficiants = [
			vraiTailleImage[0]/tailleImage[0],
			vraiTailleImage[1]/tailleImage[1],
			vraiTailleDrake[0]/tailleDrake[0],
			vraiTailleDrake[1]/tailleDrake[1]
		];
		
		var ratio = Math.min.apply(Math, coefficiants);
		var size = Math.max.apply(Math, [tailleImage[0]*ratio,tailleImage[1]*ratio]);
		$('#canvas').attr('height', size).attr('width', size);
		
		
		var drakeImg = new Image();
		drakeImg.src = $('#drake').css('background-image').replace('url("','').replace('")','');
		
		var context = document.getElementById('canvas').getContext('2d');
		context.drawImage(img, 0, 0, vraiTailleImage[0], vraiTailleImage[1], coordImage.left*ratio, coordImage.top*ratio, tailleImage[0]*ratio, tailleImage[1]*ratio);
		context.drawImage(drakeImg, 0, 0, vraiTailleDrake[0], vraiTailleDrake[1], coordDrake[0]*ratio, coordDrake[1]*ratio, tailleDrake[0]*ratio, tailleDrake[1]*ratio);
		
		/*
		html2canvas($("#cover"), {
			onrendered: function(canvas) {
				theCanvas = canvas;
				document.body.appendChild(canvas);

				// Convert and download as image 
				Canvas2Image.saveAsPNG(canvas); 
				$("#img-out").append(canvas);
				// Clean up 
				//document.body.removeChild(canvas);
			}
		});*/
	});
	
	$(document).on('dragenter', '#upload-box', function() {
		$(this).css('opacity', '1');
		$(this).css('border', '3px dashed #BBBBBB');
		return false;
	});

	$(document).on('dragover', '#upload-box', function(e) {
		e.preventDefault();
		e.stopPropagation();
		$(this).css('opacity', '1');
		$(this).css('border', '3px dashed #BBBBBB');
		return false;
	});

	$(document).on('dragleave', '#upload-box', function(e) {
		e.preventDefault();
		e.stopPropagation();
		$(this).css('opacity', '0');
		$(this).css('border', 'none');
		return false;
	});
	
	$(document).on('drop', '#upload-box', function(e) {
		if (e.originalEvent.dataTransfer){
			if (e.originalEvent.dataTransfer.files.length) {
				e.preventDefault();
				e.stopPropagation();
				upload(e.originalEvent.dataTransfer.files);
			}
			$(this).css('opacity', '0');
			$(this).css('border', 'none');
		}
		else {
			$(this).css('opacity', '0');
			$(this).css('border', 'none');
		}
		return false;
	});
	
	function upload(files) {
		var f = files[0] ;
		if (!f.type.match('image/*')) {
			alert("Attention ! Le fichier doit être une image !") ;
			return false ;
		}
		var reader = new FileReader();
		$(reader).on('load', function (e) {
			var newImage = new Image();
			newImage.src = e.target.result;
			if (newImage.width != newImage.height)
				resizeUpload(newImage);
			// document.getElementById("image").src = e.target.result;
			document.getElementById("image").src = newImage.src;
			$("#upload-info").css('display', 'none');
			$("#image").css('display', 'block');
			$("#drake").css('display', 'block');
		});
		reader.readAsDataURL(f);
	}
	
	function resizeUpload(newImage) {
		if (newImage.width > newImage.height)
			$("#image").css("height", "100%");
		else if (newImage.width < newImage.height)
			$("#image").css("width", "100%");
	}
	
	$('#upload-button').on('click', function() {
		$('#pic').trigger('click'); 
	});
	
	$("#pic").on('change', function () {
		var reader = new FileReader();
		$(reader).on('load', function (e) {
			var newImage = new Image();
			newImage.src = e.target.result;
			if (newImage.width != newImage.height)
				resizeUpload(newImage);
			// document.getElementById("image").src = e.target.result;
			document.getElementById("image").src = newImage.src;
			$("#upload-info").css('display', 'none');
			$("#image").css('display', 'block');
			$("#drake").css('display', 'block');
		});
		reader.readAsDataURL(this.files[0]);
	});
	
});