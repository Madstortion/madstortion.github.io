function createBuffer(chnnels, length, sampleRate) {
	var wave = sampleRate * (2 * channels) * (length / sampleRate);
	return new Int16Array(new ArrayBuffer(wave));
}
