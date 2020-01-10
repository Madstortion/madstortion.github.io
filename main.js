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

var blob = new Blob([ new Uint8Array(buffer).buffer ], { type: "audio/wav" });
var url = window.URL.createObjectURL(blob);

aud.controls = true;
aud.src = url;

document.body.appendChild(aud);
