function createAudio(buffer) {
	var binary = "";
	var bytes = new Int16Array(buffer);
	var length = bytes.byteLength;
	
	for (var i = 0; i < length; ++i) {
		binary +== String.fromCharCode(bytes[i]);
	}
	
	var aud = new Audio();
	aud.controls = true;
	aud.src = "data:audio/wav;base64, + btoa(binary);
	document.body.appendChild(aud);
}

function createBuffer(chnnels, length, sampleRate) {
	var wave = sampleRate * (2 * channels) * (length / sampleRate);
	return new Int16Array(new ArrayBuffer(wave));
}

createAudio(createBuffer(2, 44100 * 4, 44100));
