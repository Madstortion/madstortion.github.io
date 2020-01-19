var sampleRate = 44100;

function createAudio(buffer) {
	var binary = "";
	var bytes = new Int16Array(buffer);
	var length = bytes.byteLength;
	
	for (var i = 0; i < length; ++i) {
		binary += String.fromCharCode(bytes[i]);
	}
	
	var aud = new Audio();
	aud.controls = true;
	aud.src = "data:audio/wav;base64," + btoa(binary);
	document.body.appendChild(aud);
	
	this.sampleRate = 0;
	this.latencyHint = 0;
	
	this.start = function (time) {
		if (!time == null) {
			aud.currentTime = time;
			aud.play();
		} else {
			aud.play();
		}
	};
	this.stop = function () {
		aud.currentTime = 0;
		aud.pause();
	};
}

function createBuffer(channels, length, sampleRate) {
	var wave = sampleRate * (2 * channels) * (length / sampleRate);
	return new Int16Array(new ArrayBuffer(wave));
}

function play() {
	var button = document.createElement("button");
	button.innerText = "Play me!";
	button.onclick = function (e) {
		var buffer = createBuffer(2, sampleRate * 10, sampleRate);
		synthesise(buffer, 0, 1, 440, 1, sine);
		createAudio(buffer).start();
	};
}

function sin(x) {
	return Math.sin(x);

function sine(index, freq) {
	return sin((Math.PI * 20) * freq * index);
}

function synthesise(buffer, start, length, freq, volume, funct) {
	start *= sampleRate * 2;
	length *= sampleRate * 2;
	freq /= sampleRate;
	volume *= 32767;
	
	for (var i = 0; i < length ++i) {
		buffer[start + i] = funct(start + i, freq) * volume; 
	}
	
	return buffer;
}
