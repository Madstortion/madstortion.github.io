var aud = new Audio();

var buffer = [];

var sl = 16384;
var sr = 44100;
var wf = 440;
var wv = 127;

var period = sr / wf / 2;
var pi = Math.PI;

var n;

function sin(x) {
	return Math.sin(x);
}

for (var i = 0; i < sl; ++i) {
	n = wv * sin(i * pi / period);
	buffer[i] = n;
}

document.write(buffer);
