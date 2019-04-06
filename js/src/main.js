// Scene
// -----

var bindAll = require("./utils/function").bindAll;
var extend = require("./utils/object").extend;

var Looper = require("./utils/Looper");
var VideoBuffer = require("./sketch/VideoBuffer");
var VideoSketch = require("./sketch/VideoSketch");

var DEBUG = false;
var VIDEO_SCALE = 16;

// Sketch setup

var video = new VideoBuffer(4 * VIDEO_SCALE, 3 * VIDEO_SCALE);
var sketch = new VideoSketch(video, {
	nodesMax: 80,
	nodesRemove: 10,
	colors: [
		[ 39,  25,  70],
		[ 34,  52, 106],
		[  0, 116, 118],
		[ 27, 182, 182],
		[248, 188,  21]
	]
});

var loop = new Looper(function (frame) {
	sketch.draw();
});

// video.setSource("/video/selfie", ["ogv", "mp4"]);
setTimeout(function () {
	sketch.setSize(window.innerWidth, window.innerHeight);
	sketch.setRange(200, 400);
}, 1);

// Elements / events

var body = document.body;
var startButton = document.getElementById("start");

body.appendChild(sketch.el);
extend(sketch.el.style, {
	position: "absolute",
	top: "0",
	left: "0"
});

var onRequest = function (err) {
	if (!err) { body.className += "is-recording"; }
};

if (DEBUG) {
	body.appendChild(video.bufferDisplay);
	extend(video.bufferDisplay.style, {
		position: "absolute",
		top: "10px",
		left: "10px",
		webkitTransform: "scaleX(-1)"
	});

	document.addEventListener("keyup", function (event) {
		switch (event.which) {
		case 82: // [r]
			video.request(onRequest);
			break;
		case 32: // [space]
			video.toggle();
			loop.toggle();
			break;
		}
	});
}

startButton.addEventListener("click", function (event) {
	video.request(onRequest);
});

window.addEventListener("resize", function (event) {
	sketch.setSize(window.innerWidth, window.innerHeight);
});

// Start

video.play();
loop.play();
